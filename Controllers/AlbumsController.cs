using AngularNetVinyl.Entities.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace AngularNetVinyl.Controllers
{
    [ApiController]
    [Route("api/v1/albums")]
    public class AlbumsController : ControllerBase
    {
        private readonly IMongoCollection<Album> _albumsCollection;

        public AlbumsController(IMongoDatabase database)
        {
            _albumsCollection = database.GetCollection<Album>("albums");
        }

        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<IEnumerable<Album>>> GetAllAlbums()
        {
            var albums = await _albumsCollection.Find(_ => true).ToListAsync();
            return Ok(albums);
        }

        [HttpPost]
        [Route("create")]
        public async Task<ActionResult<Album>> CreateAlbum(Album album)
        {
            await _albumsCollection.InsertOneAsync(album);
            return CreatedAtAction(nameof(GetAlbum), new { id = album.Id }, album);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Album>> GetAlbum(string id)
        {
            var album = await _albumsCollection.Find(a => a.Id == id).FirstOrDefaultAsync();
            if (album == null)
            {
                return NotFound();
            }
            return Ok(album);
        }


        // [HttpPut]
        // [Route("{id}")]
        // public async Task<IActionResult> UpdateAlbum(string id, Album album)
        // {
        //     var objectId = new ObjectId(id);
        //     var existingCollection = await _albumsCollection.FindOneAndUpdateAsync(
        //         c => c.Id == objectId,
        //         Builders<Album>.Update.Set(c => c.Rating, album.Rating));

        //     if (existingCollection == null)
        //     {
        //         return NotFound();
        //     }

        //     return NoContent();
        // }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteAlbum(string id)
        {
            var result = await _albumsCollection.DeleteOneAsync(a => a.Id == id);
            if (result.DeletedCount == 0)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}