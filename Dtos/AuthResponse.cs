namespace AngularNetVinyl.Dtos
{
    public class AuthResponse
    {
        public string Access_token { get; set; } = string.Empty;
        public string Token_type { get; set; } = string.Empty;
        public int Expires_in { get; set; }
        public DateTime Received_at { get; set; }
    }
}