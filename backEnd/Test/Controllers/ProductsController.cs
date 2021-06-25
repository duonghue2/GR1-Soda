using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SodaBackEnd.Business.Data;
using SodaBackEnd.Data;
using Test.Business;
using Test.Data;
using Test.Models;

namespace Test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly SodaContext _context;

        public ProductsController(SodaContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpPost]
        [Route("get-list-product")]
        public async Task<BaseResponse<List<ProductModel>>> GetProducts(BaseListRequest request)
        {
            try {
                var listProduct =  _context.Products.ToList();
                var listProductModel = new List<ProductModel>();
                foreach (Product pr in listProduct) {
                    var image = _context.ProductImages.Where(s => s.ProductId == pr.Id).Select(s => s.Image).ToList();
                    var detail = _context.ProductDetails.Where(s => s.ProductId == pr.Id && s.IsActive == true).ToList();
                    
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
                var list = listProductModel.Skip((request.CurrentPage - 1) * request.PageSize).Take(request.PageSize).ToList();
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
            var detail =  _context.ProductDetails.Where(s => s.ProductId == id && s.IsActive == true).ToList();
          if(detail!=null)
            productModel.Detail = detail;
            var image = _context.ProductImages.Where(s => s.ProductId == id).Select(s => s.Image).ToList();
            if (image != null) productModel.Images = image;
           
            response.Status = 1;
            response.Message = "oke";
            response.Data = productModel;

            return response;

        }
        //// GET: api/Products/name
        //[HttpGet("name={name}")]
        //public async Task<BaseResponse<List<ProductModel>>> GetListProductByName(getListProductRequest request)
        //{
        //    try
        //    {
        //        var listProduct = await _context.Products.Where(s => s.Name.Contains(request.Name)).ToListAsync();
        //        var response = new BaseResponse<List<ProductModel>>();
        //        if (listProduct.Count==0)
        //        {
                   
        //            response.Status = 0;
        //            response.Message = "Not found any product";
        //            response.Data = null;
        //            return response;
        //        }
        //        var listProductModel = new List<ProductModel>();
        //        foreach (Product pr in listProduct)
        //        {
        //            var image = _context.ProductImages.Where(s => s.ProductId == pr.Id).Select(s => s.Image).ToList();
        //            var detail = _context.ProductDetails.Where(s => s.ProductId == pr.Id).ToList();

        //            var productModel = new ProductModel();
        //            productModel.Images = image;
        //            productModel.Name = pr.Name;
        //            productModel.Id = pr.Id;
        //            productModel.OriginPrice = pr.Price;
        //            productModel.Description = pr.Description;
        //            productModel.Category = pr.Category;
        //            productModel.Detail = detail;
        //            listProductModel.Add(productModel);
        //        }
        //        var list = listProductModel.Skip((request.Page - 1) * request.Limit).Take(request.Limit).ToList();
        //        response.Status = 1;
        //        response.Message = "oke";
        //        response.Data = list;
        //        response.Total = listProductModel.Count;
        //        return response;
        //    }
        //    catch (Exception e)
        //    {
        //        var response = new BaseResponse<List<ProductModel>>();
        //        response.Status = 0;
        //        response.Message = e.Message;
        //        return response;
        //    }

           

        //}
        
        [HttpPost]
        [Route("filter")]
        public async   Task<BaseResponse<List<ProductModel>>> Filter(FilterRequest request)
        {

            try
            {
                
                var listProduct = new List<Product>();

                var newListProduct1 = new List<Product>();
                if (request.Gender != null&&request.Gender.Count>0)
                {
                    listProduct = _context.Products.Where(x => request.Gender.Any(s => s == x.Category)).ToList();
                    

                } 
                    else listProduct = _context.Products.ToList();
                if (request.Name != null)
                {
                    foreach (var pro in listProduct)
                    {
                        if (pro.Name.ToLower().Contains(request.Name.ToLower()))
                            newListProduct1.Add(pro);

                    }
                }
                else newListProduct1 = listProduct;
            
                
            
                var listProductModel = new List<ProductModel>();
                foreach (Product pr in newListProduct1)
                {
                    var query = _context.ProductDetails.Where(s => s.ProductId == pr.Id&&s.IsActive==true);
                    if (request.Category!=null&&request.Category.Count>0)
                    {

                        query = query.Where(s => request.Category.Any(x => x == s.SubCategories));
                    }
              
                    var  detail = query.ToList();
                    var newListProduct = new List<ProductDetail>();
                    
                        foreach (var item in detail)
                        {
                            if (request.PriceFrom==null||(request.PriceFrom != null&&item.Price >= request.PriceFrom))
                            {
                                if (request.PriceTo == null || (request.PriceTo != null && item.Price <= request.PriceFrom))
                                {
                                    newListProduct.Add(item);
                                }


                            }
                        }
                    

                    if (newListProduct.Count != 0)
                    {
                        var image = _context.ProductImages.Where(s => s.ProductId == pr.Id).Select(s => s.Image).ToList();

                        var productModel = new ProductModel();
                        productModel.Images = image;
                        productModel.Name = pr.Name;
                        productModel.Id = pr.Id;
                        productModel.OriginPrice = pr.Price;
                        productModel.Description = pr.Description;
                        productModel.Category = pr.Category;
                        productModel.Detail = newListProduct;
                        listProductModel.Add(productModel);
                    }
                }
                var list = listProductModel.Count > request.PageSize ? listProductModel.Skip((request.CurrentPage - 1) * request.PageSize).Take(request.PageSize).ToList() : listProductModel;
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
        // POST: api/Products/
        [HttpPost("by-category")]
        public async Task<BaseResponse<List<ProductModel>>> GetListProductByCategory(GetListProductByCateoryRequest request)
        {

            try
            {
                var listProduct = _context.Products.Where(s=>s.Category.ToLower()==request.Category.ToLower()).ToList();
                var listProductModel = new List<ProductModel>();
                foreach (Product pr in listProduct)
                {
                    var detail = _context.ProductDetails.Where(s => s.ProductId == pr.Id).ToList();
                    if (request.SubCategory != null)
                    {
                       
                    detail=detail.Where( s=>s.SubCategories.ToLower().Contains(request.SubCategory)).ToList();
                    }
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
                var list =listProductModel.Count>request.PageSize? listProductModel.Skip((request.CurrentPage - 1) * request.PageSize).Take(request.PageSize).ToList():listProductModel;
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
        public async Task<Boolean> PostProduct(ProductModel productModel)
        {
            var product = new Product();
            product.Id = Guid.NewGuid().ToString();
            product.Category = productModel.Category;
            product.Description = productModel.Description;
            product.Name = productModel.Name;
            product.Price = productModel.OriginPrice.Value;
            _context.Products.Add(product);
            foreach (var list in productModel.Detail)
            {
                
                list.Id = Guid.NewGuid().ToString();
                list.ProductId = product.Id;
               
                _context.ProductDetails.Add(list);
            }
          
          foreach(var url in productModel.Images)
            {
                var image = new ProductImage();
                image.ProductId = product.Id;
                image.Image = url;
                _context.ProductImages.Add(image);

            }
                try
                {
                    await _context.SaveChangesAsync();

                }
                catch (DbUpdateException)
                {

                    throw;

                }
            return true;
               
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
