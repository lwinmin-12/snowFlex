import { ContentDto } from "./Content.dto"

export type resContentDto = {
    page : number,
    pageSize : number,
    total : number,
    data : ContentDto[]
}