import { createSelector, createFeatureSelector } from "@ngrx/store";
import { MovieState } from "./state";
import { Movie } from "../models/movie.models";

export const selectState = createFeatureSelector<MovieState>("movieState");

export const selectMovies = createSelector(selectState, state => state.movies);

export const selectFavoriteMovies = createSelector(selectState, state => state.favoriteMovies);

export const selectWatchList = createSelector(selectState, state => state.watchList);

export const isInFavorite = (movieId: number) => createSelector(selectFavoriteMovies, 
	(favoriteMovies: Movie[] | null) => !!favoriteMovies?.find(movie => movie.id === movieId)
)

export const isInWatchList = (movieId: number) => createSelector( selectWatchList, 
	(watchList: Movie[] | null) => !!watchList?.find(movie => movie.id === movieId)
)