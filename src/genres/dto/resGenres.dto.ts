import { GenreDto } from "./genres.dto"

export type ResGenresDto = {
    page : number,
    pageSize : number,
    total : number,
    data : GenreDto[]
}