namespace ParkAwayServer.Models
{
    public class Settings
    {
        public string JWT_Secret { get; set; }
        public string ClientURL { get; set; }
        public string SMTPServer { get; set; }
        public string Sender { get; set; }
        public int SMTPPort { get; set; }
        public string Password { get; set; }

    }
}
