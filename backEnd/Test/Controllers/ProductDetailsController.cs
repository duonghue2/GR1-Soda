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
using Test.Business;
using Test.Data;
using Test.Models;

namespace Test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductDetailsController : ControllerBase
    {
        private readonly SodaContext _context;
        private readonly ITokenService _tokenService;
        public ProductDetailsController(SodaContext context)
        {
            _context = context;
            _tokenService = new TokenController();
        }

        // GET: api/ProductDetails
        [HttpPost]
        [Route ("admin")]
        public async Task<BaseResponse<List<GetListDetailResponse>>> GetProductDetails(ListProductDetailRequest req)
        {
            var actor = _context.Users.Find(req.UserId);
            if (!_tokenService.IsValidToken(req.Token, req.UserId, actor.Name) || !actor.IsAdmin) throw new ArgumentException("Unauthorize");
            var listProd = (from pro in _context.Products
                            join detail in _context.ProductDetails
                            on pro.Id equals detail.ProductId
                            where detail.IsActive == true
                            orderby pro.Id

                            select new GetListDetailResponse()
                            {
                                ProductDetailId = detail.Id,
                                ProductId = pro.Id,
                                Name = pro.Name,
                                OriginPrice = pro.Price,
                                SalePrice = detail.Price,
                                Size = detail.Size,
                                Quantity = detail.Quantity.Value,
                                Category = pro.Category,
                                SubCategory = detail.SubCategories,
                                IsActive = detail.IsActive
                            }).

                            ToList();
            if (req.Name != null) {

                listProd=listProd.Where(s => s.Name.ToLower().Contains(req.Name.ToLower())).ToList();
            }
                       var listRes=listProd.Skip((req.CurrentPage - 1) * req.PageSize).Take(req.PageSize).ToList();
            var response = new BaseResponse<List<GetListDetailResponse>>();
            response.Status = 1;
            response.Message = "success";
            response.Data = listRes;
            response.Total = listProd.Count;
            return response;

        }
        [HttpPost]
        [Route("admin/update")]
        public async Task<BaseResponse<Boolean>> UpdateProductDetails(GetListDetailResponse req)
        {
            var actor = _context.Users.Find(req.UserId);
            if (!_tokenService.IsValidToken(req.Token, req.UserId, actor.Name) || !actor.IsAdmin) throw new ArgumentException("Unauthorize");
            var prodetail = _context.ProductDetails.Find(req.ProductDetailId);
            var product = _context.Products.Find(req.ProductId);
            prodetail.Quantity = req.Quantity;
            prodetail.SubCategories = req.SubCategory;
            prodetail.Price = req.SalePrice;
            product.Name = req.Name;
            product.Price = req.OriginPrice;
            await _context.SaveChangesAsync();
            var response = new BaseResponse<Boolean>();
            response.Status = 1;
            response.Message = "success";
            response.Data = true;
          
            return response;

        }
        [HttpPost]
        [Route("admin/delete")]
        public async Task<BaseResponse<Boolean>> DeleteProductDetail(DeleteRequest req)
        {
            var actor = _context.Users.Find(req.UserId);
            if (!_tokenService.IsValidToken(req.Token, req.UserId, actor.Name) || !actor.IsAdmin) throw new ArgumentException("Unauthorize");
            var prodetail = _context.ProductDetails.Find(req.Id);
            prodetail.IsActive = false;
            await _context.SaveChangesAsync();
            var response = new BaseResponse<Boolean>();
            response.Status = 1;
            response.Message = "success";
            response.Data = true;

            return response;

        }


        // GET: api/ProductDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDetail>> GetProductDetail(string id)
        {
            var productDetail = await _context.ProductDetails.FindAsync(id);

            if (productDetail == null)
            {
                return NotFound();
            }

            return productDetail;
        }

        

        // POST: api/ProductDetails
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
    

       

        private bool ProductDetailExists(string id)
        {
            return _context.ProductDetails.Any(e => e.Id == id);
        }
    }
}
