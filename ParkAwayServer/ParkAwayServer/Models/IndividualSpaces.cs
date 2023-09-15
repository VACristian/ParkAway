using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ParkAwayServer.Models
{
    public class IndividualSpaces
    {
        [Key]
        [Column(TypeName = "decimal")]
        public int Id { get; set; }
        
        [Column(TypeName = "bit")]
        public bool IsFull { get; set; }

        public int SpaceId { get; set; }
        [ForeignKey("SpaceId")]
        public virtual ParkingSpaces? ParkingSpaces { get; set; } 
    }
}
