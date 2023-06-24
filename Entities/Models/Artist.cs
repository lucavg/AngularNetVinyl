using MongoDB.Bson;
using MongoDbGenericRepository.Attributes;

namespace AngularNetVinyl.Entities.Models
{
    [CollectionName("artists")]
    public class Artist
    {
        public ObjectId Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Href { get; set; } = string.Empty;
        public string Uri { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public Dictionary<string, string> External_urls { get; set; } = new Dictionary<string, string>();
    }
}