Marvel.Collections = Marvel.Collections || {};

Marvel.Collections.Comics = Backbone.Collection.extend({
  model: Marvel.Models.Comic,

  buscar: function(titulo) {
    const ts = Date.now().toString();
    const publicKey = '1ef11f3874e9325cdb1600201a7ecdc6';
    const privateKey = 'f019ac886777717927fcd82231b3b948ab6af9a0';
    // Usa CryptoJS para generar el hash: md5(ts + privateKey + publicKey)
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

    this.url = `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${encodeURIComponent(titulo)}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    this.fetch({
      reset: true,
      success: function() { console.log("¡Búsqueda completa!"); },
      error: function() { console.error("Error en la búsqueda."); }
    });
  },

  parse: function(response) {
    return response.data.results.map(comic => ({
      id: comic.id,
      title: comic.title,
      description: comic.description || "Sin descripción",
      thumbnail: comic.thumbnail.path + '/standard_medium.' + comic.thumbnail.extension,
      thumbnailGrande: comic.thumbnail.path + '/portrait_uncanny.' + comic.thumbnail.extension
    }));
  }
});
