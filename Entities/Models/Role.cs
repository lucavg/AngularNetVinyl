using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace AngularNetVinyl.Entities.Models
{
    [CollectionName("roles")]
    public class Role : MongoIdentityRole<Guid>
    {
    }
}