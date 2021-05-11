using DeliveryApp.Models;
using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DeliveryApp.Services
{
    public class ProfileService : IProfileService
    {
        protected UserManager<ApplicationUser> UserManager;

        public ProfileService(UserManager<ApplicationUser> userManager)
        {
            UserManager = userManager;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            ApplicationUser user = await UserManager.GetUserAsync(context.Subject);

            IList<string> roles = await UserManager.GetRolesAsync(user);

            Claim userNameClaim = new Claim(JwtClaimTypes.Name, user.UserName);
            Claim emailClaim = new Claim(JwtClaimTypes.Email, user.Email);
            Claim firstNameClaim = new Claim(JwtClaimTypes.GivenName, user.FirstName);
            Claim lastNameClaim = new Claim(JwtClaimTypes.FamilyName, user.LastName);

            IList<Claim> roleClaims = new List<Claim>();
            foreach (string role in roles)
            {
                roleClaims.Add(new Claim(JwtClaimTypes.Role, role));
            }

            context.IssuedClaims.Add(userNameClaim);
            context.IssuedClaims.Add(emailClaim);
            context.IssuedClaims.Add(firstNameClaim);
            context.IssuedClaims.Add(lastNameClaim);
            context.IssuedClaims.AddRange(roleClaims);
        }

        public Task IsActiveAsync(IsActiveContext context)
        {
            return Task.CompletedTask;
        }
    }
}
