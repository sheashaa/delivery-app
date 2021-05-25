using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryApp.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string City { get; set; }
        public string StreetName { get; set; }
        public string Building { get; set; }
        public int? Floor { get; set; }
        public int? Apartment { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }
}
