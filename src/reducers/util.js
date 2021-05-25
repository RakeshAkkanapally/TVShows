import { tvShowService } from "./../services/tvShowServices";

export const getGenres = async () => {
  const service = new tvShowService();
  const response = await service.getAllShows();
  const AllGenres = new Set();
  response.data.forEach((show) => {
    show &&
      show.genres.forEach((item) => {
        AllGenres.add(item);
      });
  });
  return Array.from(AllGenres);
};
