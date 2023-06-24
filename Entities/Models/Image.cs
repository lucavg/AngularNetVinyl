using MongoDB.Bson;
using MongoDbGenericRepository.Attributes;

namespace AngularNetVinyl.Entities.Models
{
    [CollectionName("artists")]
    public class Image
    {
        public ObjectId Url { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }
    }
}