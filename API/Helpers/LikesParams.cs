namespace API.Helpers;

public class LikesParams : PaginationParams
{
    public int UserID { get; set; }
    public required string predicate { get; set; } = "liked";

}