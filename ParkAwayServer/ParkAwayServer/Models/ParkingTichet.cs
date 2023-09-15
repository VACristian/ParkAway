using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ParkAwayServer.Models
{
    public class ParkingTichet
    {
        [Key]
        [Column(TypeName ="decimal")]
        public int TichetId { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string Name { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string Location { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string LicensePlate { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string QRCode { get; set; }
        [Column(TypeName = "bit")]
        public bool IsValid { get; set; }
        [Column(TypeName = "smalldatetime")]
        public DateTime validtime { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual Users? Users { get; set; }
        public int SpaceId { get; set; }
        [ForeignKey("SpaceId")]
        public virtual ParkingSpaces? ParkingSpaces { get; set; }

        [Column(TypeName = "decimal")]
        public decimal Payed { get; set; }

        [Column(TypeName = "decimal")]
        public decimal InitialHour { get; set; }

        [Column(TypeName = "decimal")]
        public int? IndividualSpaceId { get; set; }

    }
}
