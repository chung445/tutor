import { Skeleton } from "./ui/skeleton";
import { Card, CardContent } from "./ui/card";

interface TutorCardSkeletonProps {
  count?: number;
}

export function TutorCardSkeleton({ count = 6 }: TutorCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />

              <div className="flex-1 space-y-3">
                {/* Name and Rating */}
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>

                {/* Subjects */}
                <div className="flex flex-wrap gap-1">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-14" />
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-18" />
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-14" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-10" />
                    <Skeleton className="h-4 w-14" />
                  </div>
                </div>

                {/* Action Button */}
                <Skeleton className="h-9 w-full mt-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3 w-32" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts/Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-6 w-48 mb-4" />
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-6 w-40 mb-4" />
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function BookingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-3 w-16 mt-2" />
          </div>
        ))}
      </div>

      {/* Form Content */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <Skeleton className="h-12 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}