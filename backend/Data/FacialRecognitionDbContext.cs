using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public class FacialRecognitionDbContext : DbContext
{
    public FacialRecognitionDbContext(DbContextOptions<FacialRecognitionDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure User entity
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FullName).IsRequired().HasMaxLength(500);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("GETUTCDATE()");
        });

        // Seed data
        SeedData(modelBuilder);
    }

    private static void SeedData(ModelBuilder modelBuilder)
    {
        // Seed admin user
        var adminId = Guid.NewGuid();
        modelBuilder.Entity<User>().HasData(new User
        {
            Id = adminId,
            FullName = "Admin",
            FaceDescriptorId = null,
            FaceDescriptorJSON = null,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        });
    }
}