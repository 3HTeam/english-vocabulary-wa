"use client";

import EditVocabularyView from "@/features/vocabulary/view/edit-vocabulary-view";
import { useParams } from "next/navigation";

export default function EditVocabularyPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <>
      {/* Mobile view placeholder */}
      <div className="md:hidden">
        <div className="flex items-center justify-center h-96 border rounded-lg bg-muted/20">
          <div className="text-center p-8">
            <h3 className="text-lg font-semibold mb-2">Chỉnh sửa từ vựng</h3>
            <p className="text-muted-foreground">
              Vui lòng sử dụng màn hình lớn hơn để xem giao diện đầy đủ.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden h-full flex-1 flex-col px-4 md:px-6 md:flex">
        <EditVocabularyView id={id} />
      </div>
    </>
  );
}
