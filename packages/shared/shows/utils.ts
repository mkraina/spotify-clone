import format from 'date-fns/format';
import { SimplifiedEpisode } from 'spotify-types';

export const getEpisodeDuration = (episode: SimplifiedEpisode) =>
  Math.ceil(episode.duration_ms / 1000 / 60);
export const getEpisodeReleaseDate = (episode: SimplifiedEpisode) =>
  format(new Date(episode.release_date), 'MMM d');
