using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Test.Business;
using Test.Data;
using Test.Models;

namespace Test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly Soda2Context _context;

        public ProductsController(Soda2Context context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpPost]
        [Route("get-list-product")]
        public async Task<BaseResponse<List<ProductModel>>> GetProducts(getListProductRequest request)
        {
            try {
                var listProduct =  _context.Products.ToList();
                var listProductModel = new List<ProductModel>();
                foreach (Product pr in listProduct) {
                    var image = _context.ProductImages.Where(s => s.ProductId == pr.Id).Select(s => s.Image).ToList();
                    var detail = _context.ProductDetails.Where(s => s.ProductId == pr.Id).ToList();
                    
                    var productModel = new ProductModel();
                    productModel.Images = image;
                    productModel.Name = pr.Name;
                    productModel.Id = pr.Id;
                    productModel.OriginPrice = pr.Price;
                    productModel.Description = pr.Description;
                    productModel.Category = pr.Category;
                    productModel.Detail = detail;
                    listProductModel.Add(productModel);
                }
                var list = listProductModel.Skip((request.Page - 1) * request.Limit).Take(request.Limit).ToList();
                var response = new BaseResponse<List<ProductModel>>();
                response.Status = 1;
                response.Message = "oke";
                response.Data = list;
                response.Total = listProductModel.Count;

                return response;
        }
        catch(Exception e){
                var response = new BaseResponse<List<ProductModel>>();
                response.Status = 0;
                response.Message = e.Message;
                return response;
            }
    }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<BaseResponse<ProductModel>> GetProduct(string id)
        {
            var product = await _context.Products.FindAsync(id);

            var response = new BaseResponse<ProductModel>();
            if (product == null)
            {
                
                response.Status = 0;
                response.Message = "Not found product";
                return response;
            }
            var productModel = new ProductModel();
            productModel.Id = product.Id;
            productModel.Name = product.Name;
            productModel.OriginPrice = product.Price;
            productModel.Description = product.Description;
            productModel.Category = product.Category;
            var detail =  _context.ProductDetails.Where(s => s.ProductId == id).ToList();
          if(detail!=null)
            productModel.Detail = detail;
            var image = _context.ProductImages.Where(s => s.ProductId == id).Select(s => s.Image).ToList();
            if (image != null) productModel.Images = image;
           
            response.Status = 1;
            response.Message = "oke";
            response.Data = productModel;

            return response;

        }
        // GET: api/Products/name
        [HttpGet("name={name}")]
        public async Task<BaseResponse<List<ProductModel>>> GetListProductByName(getListProductRequest request)
        {
            try
            {
                var listProduct = await _context.Products.Where(s => s.Name.Contains(request.Name)).ToListAsync();
                var response = new BaseResponse<List<ProductModel>>();
                if (listProduct.Count==0)
                {
                   
                    response.Status = 0;
                    response.Message = "Not found any product";
                    response.Data = null;
                    return response;
                }
                var listProductModel = new List<ProductModel>();
                foreach (Product pr in listProduct)
                {
                    var image = _context.ProductImages.Where(s => s.ProductId == pr.Id).Select(s => s.Image).ToList();
                    var detail = _context.ProductDetails.Where(s => s.ProductId == pr.Id).ToList();

                    var productModel = new ProductModel();
                    productModel.Images = image;
                    productModel.Name = pr.Name;
                    productModel.Id = pr.Id;
                    productModel.OriginPrice = pr.Price;
                    productModel.Description = pr.Description;
                    productModel.Category = pr.Category;
                    productModel.Detail = detail;
                    listProductModel.Add(productModel);
                }
                var list = listProductModel.Skip((request.Page - 1) * request.Limit).Take(request.Limit).ToList();
                response.Status = 1;
                response.Message = "oke";
                response.Data = list;
                response.Total = listProductModel.Count;
                return response;
            }
            catch (Exception e)
            {
                var response = new BaseResponse<List<ProductModel>>();
                response.Status = 0;
                response.Message = e.Message;
                return response;
            }

           

        }
        // POST: api/Products/
        [HttpPost("by-category")]
        public async Task<BaseResponse<List<ProductModel>>> GetListProductByCategory(GetListProductByCateoryRequestcs request)
        {

            try
            {
                var listProduct = _context.Products.Where(s=>s.Category.ToLower().Contains(request.Category.ToLower())).ToList();
                var listProductModel = new List<ProductModel>();
                foreach (Product pr in listProduct)
                {
                    var detail = _context.ProductDetails.Where(s => s.ProductId == pr.Id && s.SubCategories.Contains(request.SubCategory)).ToList();
                    if (detail.Count!=0)
                    {
                        var image = _context.ProductImages.Where(s => s.ProductId == pr.Id).Select(s => s.Image).ToList();

                        var productModel = new ProductModel();
                        productModel.Images = image;
                        productModel.Name = pr.Name;
                        productModel.Id = pr.Id;
                        productModel.OriginPrice = pr.Price;
                        productModel.Description = pr.Description;
                        productModel.Category = pr.Category;
                        productModel.Detail = detail;
                        listProductModel.Add(productModel);
                    }
                }
                var list =listProductModel.Count>request.Limit? listProductModel.Skip((request.Page - 1) * request.Limit).Take(request.Limit).ToList():listProductModel;
                var response = new BaseResponse<List<ProductModel>>();
                response.Status = 1;
                response.Message = "oke";
                response.Data = list;
                response.Total = listProductModel.Count;

                return response;
            }
            catch (Exception e)
            {
                var response = new BaseResponse<List<ProductModel>>();
                response.Status = 0;
                response.Message = e.Message;
                return response;
            }
        }

        // POST: api/Products
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            product.Id = Guid.NewGuid().ToString();
            _context.Products.Add(product);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                
                
                    throw;
                
            }

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> DeleteProduct(string id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return product;
        }

        private bool ProductExists(string id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
