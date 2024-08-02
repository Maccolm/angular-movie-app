import { createSelector, createFeatureSelector } from "@ngrx/store";
import { MovieState } from "./state";

export const selectState = createFeatureSelector<MovieState>("movie");

export const selectMovies = createSelector(selectState, state => state.movies);