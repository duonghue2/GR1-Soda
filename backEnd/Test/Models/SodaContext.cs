using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Test.Models
{
    public partial class SodaContext : DbContext
    {
        public SodaContext()
        {
        }

        public SodaContext(DbContextOptions<SodaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Cart> Carts { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderDetail> OrderDetails { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductDetail> ProductDetails { get; set; }
        public virtual DbSet<ProductImage> ProductImages { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-9NGASCB\\SQLEXPRESS;Database=Soda2;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("id");

                entity.Property(e => e.Amount).HasColumnName("amount");

                entity.Property(e => e.ProductDetailId)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("productDetailId");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.UserId)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("userId");

                //entity.HasOne(d => d.ProductDetail)
                //    //.WithMany(p => p.Carts)
                //    .HasForeignKey(d => d.ProductDetailId)
                //    .HasConstraintName("FK__Carts__productDe__267ABA7A");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Carts__userId__25869641");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("id");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("address");

                entity.Property(e => e.Amount).HasColumnName("amount");

                entity.Property(e => e.CreateAt)
                    .HasColumnType("date")
                    .HasColumnName("createAt");

                entity.Property(e => e.Discount).HasColumnName("discount");

                entity.Property(e => e.ModifyBy)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("modifyBy");

                entity.Property(e => e.ShippingCost).HasColumnName("shippingCost");

                entity.Property(e => e.State)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("state");

                entity.Property(e => e.Total).HasColumnName("total");

                entity.Property(e => e.UserId)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("userId");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Orders__userId__145C0A3F");
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.ToTable("orderDetail");

                entity.Property(e => e.Id)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("id");

                entity.Property(e => e.ItemAmount).HasColumnName("itemAmount");

                entity.Property(e => e.OrderId)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("orderId");

                entity.Property(e => e.ProductId)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("productId");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.UnitPrice).HasColumnName("unitPrice");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK__orderDeta__order__182C9B23");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__orderDeta__produ__173876EA");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("id");

                entity.Property(e => e.Category)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("category");

                entity.Property(e => e.Price).HasColumnName("price");
            });

            modelBuilder.Entity<ProductDetail>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("id");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.ProductId)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("productId");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.Size)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("size");

            //    entity.HasOne(d => d.Product)
            //        .WithMany(p => p.ProductDetails)
            //        .HasForeignKey(d => d.ProductId)
            //        .HasConstraintName("FK__ProductDe__produ__22AA2996");
            });

            modelBuilder.Entity<ProductImage>(entity =>
            {

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");
                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.Image)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("image");

                entity.Property(e => e.ProductId)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("productId");

                entity.HasOne(d => d.Product)
                    .WithMany()
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__ProductIm__produ__1A14E395");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("id");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("name");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("password");

                entity.Property(e => e.Phonenumber)
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .HasColumnName("phonenumber");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
