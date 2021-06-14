﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SodaBackEnd.Data;
using Test.Business;
using Test.Data;
using Test.Models;

namespace Test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly Soda2Context _context;

        public CartsController(Soda2Context context)
        {
            _context = context;
        }

      

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("get-detail-by-user/{id}")]

        public async Task<BaseResponse<CartResponse>> DetailByUserId(string id)
        {
            try
            {
                var response = new BaseResponse<CartResponse>();
                var cart = _context.Carts.Where(s => s.UserId == id).ToList();
                if (cart.Count == 0)
                {

                    response.Data = null;
                    response.Status = 1;
                    response.Message = "Empty cart";
                    return response;
                }
                var listProductModel = new List<DetailCartModel>();
                int sum = 0;
                cart.ForEach(item =>
                {
                    var detail = _context.ProductDetails.Where(s => s.Id == item.ProductDetailId).FirstOrDefault();
                    var image = _context.ProductImages.Where(s => s.ProductId == detail.ProductId).Select(s => s.Image).FirstOrDefault();
                    var product = _context.Products.Where(s => s.Id == detail.ProductId).FirstOrDefault();
                    var detailCart = new DetailCartModel();
                    detailCart.Image = image;
                    detailCart.Name = product.Name;
                    detailCart.Size = detail.Size;
                    detailCart.Id = item.Id;
                    detailCart.Price = detail.Price;
                    detailCart.OriginPrice = product.Price;
                    detailCart.DetailId = detail.Id;
                    detailCart.ProductDetailId = item.ProductDetailId;
                    detailCart.Qty = item.Quantity;
                    detailCart.MaxQty = detail.Quantity;
                    detailCart.Amount = item.Quantity * detail.Price;
                    detailCart.ProductId = product.Id;
                    listProductModel.Add(detailCart);
                    sum = (int)(sum + detailCart.Amount);
                });
                var cartRes = new CartResponse();
                cartRes.listProduct = listProductModel;
                cartRes.Total = sum;
                response.Data = cartRes;
                response.Total = listProductModel.Count;
                response.Status = 1;
                response.Message = "success";
                return response;
            }
            catch(Exception e)
            {
                throw e;
            }
        }

       

        // POST: Carts/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [Route("create")]
        public async Task<ActionResult> Create(Cart cart)
        {
            var oldCart = _context.Carts.Where(s => s.UserId == cart.UserId&& s.ProductDetailId==cart.ProductDetailId
            ).FirstOrDefault();
            if (oldCart == null)
            {


                cart.Id = Guid.NewGuid().ToString();
                _context.Carts.Add(cart);
            }
            else
            {
                oldCart.Quantity += cart.Quantity;
                _context.Carts.Update(oldCart);
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {


                throw;

            }

            return CreatedAtAction("add item to cart", new { id = cart.Id }, cart);
           
           
        }
        [HttpPost]
        [Route("update")]
        public async Task<BaseResponse<CartResponse>> Update(List<Cart> listCart)
        {
            var response = new BaseResponse<CartResponse>();
            var oldCart = _context.Carts.Where(s => s.UserId == listCart[0].UserId).ToList();
            _context.Carts.RemoveRange(oldCart);
            _context.Carts.AddRange(listCart);
            await _context.SaveChangesAsync();
            
            return await DetailByUserId(listCart[0].UserId);



        }
        //// GET: Carts/Edit/5
        //[HttpGet]
        //[Route("edit/{id}")]
        //public async Task<IActionResult> Edit(string id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var cart = await _context.Carts.FindAsync(id);
        //    if (cart == null)
        //    {
        //        return NotFound();
        //    }
        //    ViewData["ProductDetailId"] = new SelectList(_context.ProductDetails, "Id", "Id", cart.ProductDetailId);
        //    ViewData["UserId"] = new SelectList(_context.Users, "Id", "Id", cart.UserId);
        //    return View(cart);
        //}

        //// POST: Carts/Edit/5
        //// To protect from overposting attacks, enable the specific properties you want to bind to, for 
        //// more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Edit(Guid? id, [Bind("Id,UserId,ProductDetailId,Quantity,Amount")] Cart cart)
        //{
        //    if (id != cart.Id)
        //    {
        //        return NotFound();
        //    }

        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            _context.Update(cart);
        //            await _context.SaveChangesAsync();
        //        }
        //        catch (DbUpdateConcurrencyException)
        //        {
        //            if (!CartExists(cart.Id))
        //            {
        //                return NotFound();
        //            }
        //            else
        //            {
        //                throw;
        //            }
        //        }
        //        return RedirectToAction(nameof(Index));
        //    }
        //    ViewData["ProductDetailId"] = new SelectList(_context.ProductDetails, "Id", "Id", cart.ProductDetailId);
        //    ViewData["UserId"] = new SelectList(_context.Users, "Id", "Id", cart.UserId);
        //    return View(cart);
        //}

        // GET: Carts/Delete/5
        [HttpPost]
        [Route("delete")]
        public async Task<BaseResponse<CartResponse>> Delete(DeleteRequest del)
        {
            if (del.Id == null)
            {
                throw new ArgumentException("Item is null");
            }

            var cart = await _context.Carts
                .FirstOrDefaultAsync(m => m.Id == del.Id&& m.UserId==del.UserId);
            if (cart == null)
            {
                throw new ArgumentException("Item is not found");
            }
            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();
            
            return await DetailByUserId(del.UserId);


        }

        //POST: Carts/Delete/5
        //POST: Carts/Delete/5
        [HttpPost]
        [Route("delete-user-cart")]
        public async Task<BaseResponse<Boolean>>DeleteConfirmed(string id)
        {
            var cart =  _context.Carts.Where(s=>s.UserId==id).ToList();
            _context.Carts.RemoveRange(cart);
            await _context.SaveChangesAsync();
            var response = new BaseResponse<Boolean>();
            response.Data = true;
            response.Total = cart.Count();
            return response;

        }

        private bool CartExists(string id)
        {
            return _context.Carts.Any(e => e.Id == id);
        }
    }
}
