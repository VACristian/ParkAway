using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ParkAwayServer.Models
{
    public class ParkingSpaces
    {
        [Key]
        [Column(TypeName = "decimal")]
        public int SpaceId { get; set; }
        [Column(TypeName ="nvarchar(30)")]
        public string Name { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Description { get; set; }
        [Column(TypeName = "nvarchar(30)")]
        public string Location { get; set; }
        [Column(TypeName = "bit")]
        public bool IsFull { get; set; }
        [Column(TypeName = "decimal")]
        public int ParkingSlots { get; set; }
        [Column(TypeName = "decimal")]
        public int OccupiedSlots { get; set; }
        [Column(TypeName = "decimal")]
        public int Price { get; set; }
        [Column(TypeName = "decimal(18, 15)")]
        public decimal Lat { get; set; }

        [Column(TypeName = "decimal(18, 15)")]
        public decimal Lng { get; set; }

       


    }
}
