namespace AngularNetVinyl.Dtos
{
    public class RemoveAlbumRequest
    {
        public string CollectionId { get; set; } = string.Empty;
        public string AlbumId { get; set; } = string.Empty;
    }
}