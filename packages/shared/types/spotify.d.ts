import 'spotify-types';

declare module 'spotify-types' {
  /**
   * The type of entity to return. Valid values: artists or tracks
   */
  type TopItemsType = 'artists' | 'tracks';
  /**
   * Over what time frame the affinities are computed.
   * Valid values:
   * long_term (calculated from several years of data and including all new data as it becomes available),
   * medium_term (approximately last 6 months),
   * short_term (approximately last 4 weeks).
   * @default medium_term
   */
  type TopItemsTimeRange = 'long_term' | 'medium_term' | 'short_term';
}
