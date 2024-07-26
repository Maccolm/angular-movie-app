import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { Movie } from "../models/movie.models";

@Injectable({
	providedIn: 'root'
 })
 export class selectedMoviesResolver implements Resolve<Movie[]>{
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Movie[]> {
		throw new Error("Method not implemented.");
	}
	
 }