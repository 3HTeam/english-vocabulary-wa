"use client";

import TopicView from "@/features/topic/views";

export default function TopicPage() {
  return (
    <>
      {/* Mobile view placeholder - shows message instead of images */}
      <div className="md:hidden">
        <div className="flex items-center justify-center h-96 border rounded-lg bg-muted/20">
          <div className="text-center p-8">
            <h3 className="text-lg font-semibold mb-2">Chủ đề</h3>
            <p className="text-muted-foreground">
              Vui lòng sử dụng màn hình lớn hơn để xem giao diện đầy đủ.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden h-full flex-1 flex-col px-4 md:px-6 md:flex">
        <TopicView />
      </div>
    </>
  );
}
