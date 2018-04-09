export const getApiSearchPromise = (searchParams, url) => {
  return new Promise((resolve, reject) => {
    if (searchParams.query) {
      return fetch(url, {})
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(error => reject(error))
    } else {
      return reject({error: 'emtpy search params'})
    }
  }) 
}

export const getSolrSearchPromise = (searchParams, url) => {
  return new Promise((resolve, reject) => {
    if (searchParams.query) {
      let params = Object.assign({ wt: "json" }, searchParams.highlightParams);
      let solrParams = {
        offset: searchParams.offset,
        limit: searchParams.limit,
        query: searchParams.query,
        filter: searchParams.filter,
        fields: searchParams.fetchFields, 
        facet: searchParams.facet,
        params
      };
      const reqBody = JSON.stringify(solrParams);  
      // do the search. 'post' is required with a fetch() body. Solr doesn't mind
      fetch(url, {
        method: 'post',
        body: reqBody,
        headers: new Headers({ 'Content-Type': 'application/json' })
      })
      .then(response => response.json())
      .then(response => resolve(response))
      .catch(error => reject(error))
    } else { 
      return reject({error: 'emtpy search params'})
    }
  })  
}