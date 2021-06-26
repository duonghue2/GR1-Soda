using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SodaBackEnd.Business.Data;
using SodaBackEnd.Data;
using SodaBackEnd.Interfaces;
using Test.Data;
using Test.Models;

namespace Test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly SodaContext _context;
        private readonly ITokenService _tokenService;

        public OrdersController(SodaContext context)
        {
            _context = context;
            _tokenService = new TokenController();
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }

        //// GET: api/Orders/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Order>> GetOrder(string id)
        //{
        //    var order = await _context.Orders.FindAsync(id);

        //    if (order == null)
        //    {
        //        return NotFound();
        //    }

        //    return order;
        //}
        [HttpPost]
        [Route("purchase")]
        public async Task<BaseResponse<List<PurchaseHistoryResponse>>> GetPurchaseHistory(BaseTokenRequest req)
        {

            var actor = _context.Users.Find(req.UserId);
            if (!_tokenService.IsValidToken(req.Token, req.UserId, actor.Name)) throw new ArgumentException("Unauthorize");
            var response = new BaseResponse<List<PurchaseHistoryResponse>> ();
            var listOrder = new List<PurchaseHistoryResponse>();
            var order =  _context.Orders.Where(s=>s.UserId==req.UserId).ToList();
            if (order == null || order.Count() == 0)
            {
                response.Data = null;
                response.Message = "Order not found";
                return response;
            }
            foreach (var item in order)
            {
                var history = new PurchaseHistoryResponse();
                history.Order = item;

                var listItem = _context.OrderDetails.Where(s => s.OrderId == item.Id).Select(s => new DetailResponse() {
                    Id = s.ProductId,
                    ProductDetailId=s.ProductDetailId,
                    Image=s.Image,
                    Qty=s.Quantity,
                    Size=s.Size,
                    OrderId=s.OrderId,
                    DetailOrderId=s.Id,
                    Price=s.UnitPrice,
                    ItemAmount=s.ItemAmount
                })
              .ToList();
                history.Details = listItem;
                listOrder.Add(history);
            }
            response.Data = listOrder;
            response.Total = listOrder.Count();
            response.Message = "success";
           
           
            return response
                ;
        }
        [HttpPost]
        [Route("list-order")]
        public async Task<BaseResponse<List<OrderModel>>> GetListOrder(GetListOrderRequest req)
        {

            var actor = _context.Users.Find(req.UserId);
            if (!_tokenService.IsValidToken(req.Token, req.UserId, actor.Name)||!actor.IsAdmin) throw new ArgumentException("Unauthorize");
            var response = new BaseResponse<List<OrderModel>>();
            var listOrderRes = new List<OrderModel>();
            var orders = _context.Orders.Where(s => s.State == req.State);
            if (req.CreateDate != null) orders.Where(s => s.CreateAt.Value.Date == req.CreateDate.Value.Date && s.CreateAt.Value.Month == req.CreateDate.Value.Month && s.CreateAt.Value.Year == req.CreateDate.Value.Year);
            if (req.ReceiverName != null) orders.Where(s => s.Receiver == req.ReceiverName);


            var listOrder= orders.ToList().Skip((req.CurrentPage - 1) * req.PageSize).Take(req.PageSize).ToList(); 
            if (listOrder == null || listOrder.Count() == 0)
            {
                response.Data = null;
                response.Total = 0;
                response.Message = "Empty order list";
                return response;
            }
            foreach (var item in listOrder)
            {
                var order = new OrderModel();
                order.Id = item.Id;
                order.Order = "#" + item.Id.ToString().Substring(0, 8);
                order.UserId = item.UserId;
                order.Receiver = item.Receiver;
                order.Address = item.Address;
                order.Receiver = item.Receiver;
                order.State = item.State;
                order.Amount = item.Amount;
                order.CreateAt = item.CreateAt;
                order.UserName = actor.Name;
                listOrderRes.Add(order);
            }
            response.Data = listOrderRes;
            response.Total = listOrder.Count();
            response.Message = "success";


            return response
                ;
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<BaseResponse<PurchaseHistoryResponse>> GetOrderById(string id)
        {

           
            var response = new BaseResponse<PurchaseHistoryResponse>();
           
            var order = _context.Orders.Find(id);
            if (order == null )
            {
                response.Data = null;
                response.Message = "Order not found";
                return response;
            }
            
                var history = new PurchaseHistoryResponse();
                history.Order = order;

                var listItem = _context.OrderDetails.Where(s => s.OrderId == order.Id).Select(s => new DetailResponse()
                {
                    Id = s.ProductId,
                    ProductDetailId = s.ProductDetailId,
                    Image = s.Image,
                    Qty = s.Quantity,
                    Size = s.Size,
                    OrderId = s.OrderId,
                    DetailOrderId = s.Id,
                    Price = s.UnitPrice,
                    ItemAmount = s.ItemAmount
                })
              .ToList();
                history.Details = listItem;
            
            
            response.Data = history;
            response.Total = 1;
            response.Message = "success";


            return response
                ;
        }
        // POST: api/Orders
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<OrderResponse>> Create(OrderRequest order)
        {
            try
            {
                var actor = _context.Users.Find(order.UserId);
                if (!_tokenService.IsValidToken(order.Token, order.UserId, actor.Name)) throw new ArgumentException("Unauthorize");
                var cartController = new CartsController(_context);
            var detail = await cartController.DetailByUserId(order);
            var newOrder = new Order();
            newOrder.Id = Guid.NewGuid().ToString();
            newOrder.UserId = order.UserId;
            newOrder.Province = order.Province;
            newOrder.District = order.District;
            newOrder.Ward = order.Ward;
            newOrder.ShippingCost = 0;
            newOrder.Address = order.Address;
            newOrder.Receiver = order.Receiver;
            newOrder.CreateAt = DateTime.Now;
            newOrder.Discount = 0;
            newOrder.Amount =detail.Data.Total;
            newOrder.State = "pending";
                newOrder.CreateAt = DateTime.Now;
               
            _context.Orders.Add(newOrder);
                foreach (var item in detail.Data.ListProduct)
                {
                    var detailProduct = _context.ProductDetails.Find(item.ProductDetailId);
                    
                    if (detailProduct.Quantity > item.Qty)
                    {
                        var newDetailOrder = new OrderDetail();
                        newDetailOrder.Id = Guid.NewGuid().ToString();
                        newDetailOrder.OrderId = newOrder.Id;
                        newDetailOrder.ItemAmount = item.Price.Value;
                        newDetailOrder.ProductDetailId = item.ProductDetailId;
                        newDetailOrder.Quantity = item.Qty;
                        newDetailOrder.UnitPrice = item.OriginPrice;
                        newDetailOrder.ProductName = item.Name;
                        newDetailOrder.Size = item.Size;
                        newDetailOrder.Image = item.Image;
                        
                        _context.OrderDetails.Add(newDetailOrder);

                        detailProduct.Quantity -= item.Qty;
                        _context.ProductDetails.Update(detailProduct);
                    }
                    else throw new ArgumentException("Not enough item in stock");
                }

                
                   await _context.SaveChangesAsync();
                var baseRequest = new BaseTokenRequest();
                baseRequest.UserId = order.UserId;
                baseRequest.Token = order.Token;

               await cartController.DeleteUserCart(baseRequest);
                var response = new OrderResponse();
                response.IsSuccess = true;
                response.OrderID = newOrder.Id;
                return  response;
            }
            catch (DbUpdateException e)
            {

                throw e;

            }

           
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Order>> DeleteOrder(string id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return order;
        }
        [HttpPatch("{id}")]
        public async Task<BaseResponse<PurchaseHistoryResponse>> ApproveOrder(string id,string state )
        {
            var order = _context.Orders.Where(s => id == s.Id).FirstOrDefault();
            if (order == null) throw new Exception("ORDER_NOT_FOUND");       
          
            if (order.State == "pending")
            {
                var orderDetail = _context.OrderDetails.Where(s => s.OrderId == id).ToList();
                foreach(var item in orderDetail)
                {
                    var productDetail = _context.ProductDetails.Find(item.ProductDetailId);
                    if (productDetail.Quantity > item.Quantity) productDetail.Quantity -= item.Quantity;
                    else { order.State = "Cancel"; break; }
                }
               
            }
           if(state!=null)order.State = state;
            await _context.SaveChangesAsync();
            return await GetOrderById(id);



        }


        private bool OrderExists(string id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
