import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Star, MapPin, Clock, DollarSign, Search, Eye, ArrowLeft, Loader2, AlertCircle, GraduationCap } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { motion } from "motion/react";
import TutorDetail from "./tutor-detail";
import { ReviewService } from "../services/reviewService";
import { ThemeToggle } from "./theme-toggle";
import { TutorCardSkeleton } from "./skeletons";
interface Tutor {
  id: string;
  name: string;
  subjects: string[];
  area: string;
  hourlyRate: number;
  avatar: string;
  rating: number;
  experience: number;
  phone: string;
  email: string;
}

interface PublicTutorsProps {
  tutors: Tutor[];
}

export default function PublicTutors({ tutors }: PublicTutorsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterArea, setFilterArea] = useState<string>("");
  const [filterSubject, setFilterSubject] = useState<string>("");
  const [selectedTutorId, setSelectedTutorId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search term to avoid excessive filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Get unique areas and subjects for filters
  const { uniqueAreas, uniqueSubjects } = useMemo(() => {
    try {
      const areas = Array.from(new Set(tutors.map(t => t.area))).filter(Boolean);
      const subjects = Array.from(
        new Set(tutors.flatMap(t => t.subjects || []))
      ).filter(Boolean);
      return { uniqueAreas: areas, uniqueSubjects: subjects };
    } catch (err) {
      console.error("Error processing tutor data:", err);
      setError("Có lỗi khi tải dữ liệu gia sư");
      return { uniqueAreas: [], uniqueSubjects: [] };
    }
  }, [tutors]);

  // Filter tutors based on search and filters with error handling
  const filteredTutors = useMemo(() => {
    try {
      setIsLoading(true);
      setError(null);

      const filtered = tutors.filter(tutor => {
        const searchMatch =
          tutor.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          (tutor.subjects || []).some((s: string) =>
            s.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          );
        const areaMatch = !filterArea || tutor.area === filterArea;
        const subjectMatch = !filterSubject || (tutor.subjects || []).includes(filterSubject);

        return searchMatch && areaMatch && subjectMatch;
      });

      setIsLoading(false);
      return filtered;
    } catch (err) {
      console.error("Error filtering tutors:", err);
      setError("Có lỗi khi tìm kiếm gia sư");
      setIsLoading(false);
      return [];
    }
  }, [tutors, debouncedSearchTerm, filterArea, filterSubject]);

  // If a tutor is selected, show detail view
  if (selectedTutorId) {
    return (
      <div>
        <Button
          variant="ghost"
          onClick={() => setSelectedTutorId(null)}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại danh sách gia sư
        </Button>
        <TutorDetail tutorId={selectedTutorId} onBack={() => setSelectedTutorId(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Guest Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-lg shadow-sm">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Hệ thống Gia sư</h1>
                <p className="text-sm text-white/90">Kết nối gia sư và phụ huynh hiệu quả</p>
              </div>
            </div>
            <div className="flex gap-2">
              <ThemeToggle />
              <Button asChild variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                <Link to="/login">Đăng Nhập Admin</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tìm Gia Sư</h1>
            <p className="text-gray-600 mt-2">
              Khám phá danh sách gia sư có kinh nghiệm trong hệ thống
            </p>
          </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Tìm Kiếm</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm theo tên gia sư hoặc môn học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
            {isLoading && (
              <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-gray-400" />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Khu Vực
              </label>
              <select
                value={filterArea}
                onChange={(e) => setFilterArea(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tất cả khu vực</option>
                {uniqueAreas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Môn Học
              </label>
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tất cả môn học</option>
                {uniqueSubjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tutors Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2
            }
          }
        }}
      >
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 6 }).map((_, index) => (
            <TutorCardSkeleton key={index} />
          ))
        ) : error ? (
          <div className="col-span-full text-center py-12">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Có lỗi xảy ra
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button
              onClick={() => {
                setError(null);
                setSearchTerm("");
                setFilterArea("");
                setFilterSubject("");
              }}
              variant="outline"
            >
              Thử lại
            </Button>
          </div>
        ) : filteredTutors.length > 0 ? (
          filteredTutors.map((tutor, index) => (
            <motion.div
              key={tutor.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut"
                  }
                }
              }}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="h-full"
            >
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <Avatar>
                        <AvatarImage src={tutor.avatar} alt={tutor.name} />
                        <AvatarFallback>
                          {tutor.name.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg line-clamp-2">
                          {tutor.name}
                        </CardTitle>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {ReviewService.getTutorReviewStats(tutor.id).averageRating || tutor.rating || 0}/5.0
                          </span>
                          <span className="text-xs text-gray-500">
                            ({ReviewService.getTutorReviewStats(tutor.id).totalReviews})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 flex-1 flex flex-col">
                  {/* Subjects */}
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-2">MÔN HỌC</p>
                    <div className="flex flex-wrap gap-1">
                      {(tutor.subjects || []).map((subject: string) => (
                        <Badge key={subject} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Area */}
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{tutor.area}</span>
                  </div>

                  {/* Experience */}
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">
                      {tutor.experience || 0} năm kinh nghiệm
                    </span>
                  </div>

                  {/* Hourly Rate */}
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">
                      {tutor.hourlyRate || 0}₫/giờ
                    </span>
                  </div>

                  {/* Contact Button */}
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 mt-auto"
                    onClick={() => setSelectedTutorId(tutor.id)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Xem chi tiết & Đánh giá
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <motion.div
            className="col-span-full text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-500 text-lg">
              Không tìm thấy gia sư phù hợp với tiêu chí của bạn
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Stats */}
      {filteredTutors.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-700">
            Tìm thấy <span className="font-bold text-blue-600">{filteredTutors.length}</span> gia sư
          </p>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}
