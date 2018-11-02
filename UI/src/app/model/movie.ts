import { IMovie } from './movie.interface';

export class Movie implements IMovie {
    public id: number;
    public title: string;
    public vote_average: number;
    public vote_count: number;
    public popularity: number;
    public poster_path: string;  
    public overview: string;
    public release_date: string;   
    public original_title: string;
    public comments: string;
    
}
