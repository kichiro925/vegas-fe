import { setGameList, setCurrentPage } from '../store/reducers/gameSlice';
import { setLoading } from '../store/reducers/load';
import { setIsTransitioning } from '../store/reducers/gameSlice';

export const fetchGameList = async ({
    Api,
    provider,
    page,
    pageSize,
    dispatch,
    gameList,
    isScroll = false,
    filter = ""
}) => {
    try {
      dispatch(setLoading(true));

      const response = await Api.getGameList(provider, page, pageSize, filter);

      if (response?.data?.result) {
        if (isScroll) {
          dispatch(setGameList({
            count: response.data.count,
            result: [...(gameList?.result || []), ...response.data.result]
          }));
        } else {
          dispatch(setGameList(response.data));
        }
        dispatch(setCurrentPage(page));
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      dispatch(setIsTransitioning(false));
    }
};