using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        private readonly Soda2Context _context;
        private readonly ITokenService _tokenService;

        public OrdersController(Soda2Context context)
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
        [HttpGet]
        [Route("purchase/{id}")]
        public async Task<BaseResponse<List<PurchaseHistoryResponse>>> GetAllOrder(BaseRequest req)
        {

            var actor = _context.Users.Find(req.UserId);
            if (!_tokenService.isValidToken(req.Token, req.UserId, actor.Name)) throw new ArgumentException("Unauthorize");
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


        // POST: api/Orders
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<OrderResponse>> Create(OrderRequest order)
        {
            try
            {
                var actor = _context.Users.Find(order.UserId);
                if (!_tokenService.isValidToken(order.Token, order.UserId, actor.Name)) throw new ArgumentException("Unauthorize");
                var cartController = new CartsController(_context);
            var detail = await cartController.DetailByUserId(order.UserId);
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
                foreach (var item in detail.Data.listProduct)
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
                var baseRequest = new BaseRequest();
                baseRequest.UserId = order.UserId;
                baseRequest.Token = order.Token;

               await cartController.DeleteConfirmed(baseRequest);
                var response = new OrderResponse();
                response.IsSuccess = true;
                response.OrderID = newOrder.Id;
                return  response;
            }
            catch (DbUpdateException)
            {

                throw;

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


        private bool OrderExists(string id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
