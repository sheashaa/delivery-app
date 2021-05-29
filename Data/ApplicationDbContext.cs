using DeliveryApp.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryApp.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            const string MANAGER_ROLE_ID = "0A3A9831-8DBA-4F86-996A-FD3A40CC0030";
            const string COURIER_ROLE_ID = "3E0A855D-6FCB-4C23-850E-C13B567621A5";
            const string CUSTOMER_ROLE_ID = "4973D731-E8B6-4982-8D96-0E4A0368E581";

            builder.Entity<IdentityRole>().HasData(new IdentityRole
            {
                Name = "Manager",
                NormalizedName = "MANAGER",
                Id = MANAGER_ROLE_ID,
            });

            builder.Entity<IdentityRole>().HasData(new IdentityRole
            {
                Name = "Courier",
                NormalizedName = "COURIER",
                Id = COURIER_ROLE_ID,
            });
            
            builder.Entity<IdentityRole>().HasData(new IdentityRole
            {
                Name = "Customer",
                NormalizedName = "CUSTOMER",
                Id = CUSTOMER_ROLE_ID,
            });

            builder.Entity<OrderItem>().HasOne(m => m.Meal).WithOne().OnDelete(DeleteBehavior.SetNull);
            builder.Entity<OrderItem>().HasIndex(m => m.MealId).IsUnique(false);
            builder.Entity<Order>().Property(s => s.DateTime).HasDefaultValueSql("GETDATE()");
            builder.Entity<Order>().Property(o => o.Status).HasDefaultValue(OrderStatus.Queued);
            builder.Entity<Restaurant>().Property(r => r.Tags)
                .HasConversion(v => string.Join(',', v), v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));
            builder.Entity<Restaurant>().Property(r => r.Menu)
                .HasConversion(v => string.Join(',', v), v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));
        }

        public virtual DbSet<Address> Addresses { get; set; }
        public virtual DbSet<Branch> Branches { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderItem> OrderItems { get; set; }
        public virtual DbSet<Meal> Meals { get; set; }
        public virtual DbSet<Restaurant> Restaurants { get; set; }
        public virtual DbSet<Delivery> Deliveries { get; set; }
    }
}
