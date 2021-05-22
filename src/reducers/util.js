import { tvShowService } from "./../services/tvShowServices";



export const getGenres = async () => {
  
  const service = new tvShowService();
  const response = await service.getGenresAllShows();
  const AllGenres = new Set();
  console.log(response);
  response.data.forEach((show) => {
      show && show.genres.forEach((item)=>{

          AllGenres.add(item);
      });
  });
  return Array.from(AllGenres);
};
