import { createSelector, createFeatureSelector } from "@ngrx/store";
import { MovieState } from "./state";

export const selectState = createFeatureSelector<MovieState>("movieState");

export const selectMovies = createSelector(selectState, state => state.movies);