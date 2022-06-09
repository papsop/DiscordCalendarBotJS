
export interface Config
{
    Discord: 
    {
        token : string;
        app_id : string;
    },
    Trace:
    {
        level : number;
        max_source_length : number;
    },
    Colors:
    {
        info: [number, number, number];
        success: [number, number, number];
        warn: [number, number, number];
        error: [number, number, number];
    }
}