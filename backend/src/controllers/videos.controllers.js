const videos = [
    {
      id: 0,
      poster: '/0/poster',
      duration: '3 mins',
      name: 'Sample 1'
    },
    {
      id: 1,
      poster: '/1/poster',
      duration: '4 mins',
      name: 'Sample 2'
    },
    {
      id: 2,
      poster: '/2/poster',
      duration: '2 mins',
      name: 'Sample 3'
    },
  ];

export const getVideos = (req , res) => {
    res.json(videos);
}

export const getData = (req , res) => {
    const id = parseInt(req.params.id, 10);
    res.json(videos[id]);
}



