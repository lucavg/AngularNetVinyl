namespace AngularNetVinyl.Data
{
    public class LoginResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public string AccessToken { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string CollectionId { get; set; } = string.Empty;
    }
}