import gulp from 'gulp';
import cache from 'gulp-cache';

export default function clearCache() {
  return cache.clearAll();
}
