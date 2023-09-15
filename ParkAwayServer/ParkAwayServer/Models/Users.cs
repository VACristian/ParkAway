using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace ParkAwayServer.Models
{
    public class Users:IdentityUser
    {
        [Column(TypeName = "nvarchar(30)")]
        public String name { get; set; }
        [Column(TypeName = "nvarchar(30)")]
        public String lastname { get; set; }
        [Column(TypeName = "nvarchar(70)")]
        public String street { get; set; }
        [Column(TypeName = "nvarchar(30)")]
        public String city { get; set; }
        [Column(TypeName = "nvarchar(10)")]
        public String streetnumber { get; set; }

        [Column(TypeName = "nvarchar(10)")]
        public String userTypeAcc { get; set; }


    }
}
