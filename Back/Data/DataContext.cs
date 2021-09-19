using Microsoft.EntityFrameworkCore;

namespace Back.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) :
            base(options)
        {
        }

        /* public DbSet<tableName> tableNameInPlural { get; set; } */
    }
}
