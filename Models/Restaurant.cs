using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryApp.Models
{
    public class Restaurant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FacebookLink { get; set; }
        public string TwitterLink { get; set; }
        public string InstagramLink { get; set; }
        public string Image { get; set; }
        public string[] Tags { get; set; }
        public string[] Menu { get; set; }
        public virtual ICollection<Meal> Meals { get; set; }
        public virtual ICollection<Branch> Branches { get; set; }
        public string ManagerId { get; set; }
        public virtual ApplicationUser Manager { get; set; }
    }
}
