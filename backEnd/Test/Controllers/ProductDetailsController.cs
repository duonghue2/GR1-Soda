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
                           //where 
                           //detail.IsActive&& 
                           // (req.Name!=null&&pro.Name.Contains(req.Name))
                            select new GetListDetailResponse()
                            {
                                ProductDetailId=detail.Id,
                                ProductId=pro.Id,
                                Name = pro.Name,
                                OriginPrice = pro.Price,
                                SalePrice = detail.Price,
                                Size = detail.Size,
                                Quantity = detail.Quantity.Value,
                                Category = pro.Category,
                                SubCategory = detail.SubCategories
                            }).
                           
                            ToList().Skip((req.CurrentPage - 1) * req.PageSize).Take(req.PageSize).ToList();
            var response = new BaseResponse<List<GetListDetailResponse>>();
            response.Status = 1;
            response.Message = "success";
            response.Data = listProd;
            response.Total = listProd.Count;
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
        [HttpPost]
        public async Task<ActionResult<ProductDetail>> PostProductDetail(ProductDetail productDetail)
        {
            productDetail.Id = Guid.NewGuid().ToString();
            _context.ProductDetails.Add(productDetail);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
              
                    throw;
                 
            }

            return CreatedAtAction("GetProductDetail", new { id = productDetail.Id }, productDetail);
        }

        // DELETE: api/ProductDetails/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProductDetail>> DeleteProductDetail(string id)
        {
            var productDetail = await _context.ProductDetails.FindAsync(id);
            if (productDetail == null)
            {
                return NotFound();
            }

            _context.ProductDetails.Remove(productDetail);
            await _context.SaveChangesAsync();

            return productDetail;
        }

        private bool ProductDetailExists(string id)
        {
            return _context.ProductDetails.Any(e => e.Id == id);
        }
    }
}
