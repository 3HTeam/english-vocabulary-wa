export const defaultMessages = {
  meta: {
    signin: {
      title: "Đăng nhập - {name}",
      desc: "Đăng nhập vào tài khoản {name} của bạn để tiếp tục xây dựng vốn từ vựng.",
    },
    signup: {
      title: "Đăng ký - {name}",
      desc: "Tạo tài khoản {name} mới và bắt đầu học tiếng Anh ngay hôm nay.",
    },
    verify: {
      title: "Xác thực Email - {name}",
      desc: "Vui lòng xác thực địa chỉ email của bạn để bảo mật tài khoản.",
    },
    forgot_password: {
      title: "Quên mật khẩu - {name}",
      desc: "Đặt lại mật khẩu để lấy lại quyền truy cập vào tài khoản của bạn.",
    },
    topic: {
      title: "Chủ đề - {name}",
      desc: "Quản lý chủ đề.",
    },
    vocabulary: {
      title: "Từ vựng - {name}",
      desc: "Quản lý từ vựng.",
    },
    user: {
      title: "Người dùng - {name}",
      desc: "Quản lý người dùng.",
    },
    setting: {
      title: "Cài đặt - {name}",
      desc: "Quản lý cài đặt hệ thống.",
    },
    level: {
      title: "Cấp độ - {name}",
      desc: "Quản lý cấp độ.",
    },
    module: {
      title: "Chức năng - {name}",
      desc: "Quản lý chức năng.",
    },
    onboarding: {
      title: "Onboarding - {name}",
      desc: "Quản lý onboarding.",
    },
  },
  auth: {
    signin: {
      signin: "Đăng nhập",
      title: "Chào mừng trở lại",
      desc: "Đăng nhập vào tài khoản {name} của bạn",
      forgot: "Quên mật khẩu?",
      no_account: "Chưa có tài khoản?",
      agree:
        "Bằng cách tiếp tục, bạn đồng ý với <termsLink>{termsLabel}</termsLink> và <privacyLink>{privacyLabel}</privacyLink> của chúng tôi.",
      ok: "Đăng nhập thành công!",
      err: "Đăng nhập thất bại, vui lòng thử lại!",
    },
    signup: {
      signup: "Đăng ký",
      title: "Chào mừng đến với {name}",
      desc: "Đăng ký tài khoản {name} của bạn",
      agree:
        "Tôi đồng ý với <termsLink>{termsLabel}</termsLink> và <privacyLink>{privacyLabel}</privacyLink>",
      has_account: "Đã có tài khoản?",
      ok: "Đăng ký thành công, vui lòng xác thực email!",
      err: "Đăng ký thất bại, vui lòng thử lại!",
    },
    forgot_password: {
      title: "Quên mật khẩu?",
      desc: "Nhập địa chỉ email của bạn và chúng tôi sẽ gửi liên kết để đặt lại mật khẩu",
      submit: "Gửi liên kết đặt lại",
      remember: "Bạn đã nhớ mật khẩu?",
    },
    verify: {
      title: "Xác thực Email",
      desc: "Vui lòng nhập mã OTP đã được gửi đến email của bạn",
      submit: "Xác thực Email",
      no_code: "Chưa nhận được mã?",
      send_code: "Gửi mã",
      resend_code: "Gửi lại mã",
      ok: "Xác thực email thành công!",
      err: "Xác thực email thất bại, vui lòng thử lại!",
    },
    signout: {
      signout: "Đăng xuất",
      ok: "Đăng xuất thành công!",
      err: "Đăng xuất thất bại, vui lòng thử lại!",
    },

    link: {
      terms: "Điều khoản dịch vụ",
      privacy: "Chính sách bảo mật",
    },

    or_continue_with: "Hoặc tiếp tục với",
    back_to_sign_in: "Quay lại đăng nhập",
  },
  field: {
    email: "Email",
    email_placeholder: "johndoe@gmail.com",
    email_required: "Email bắt buộc!",
    email_invalid: "Địa chỉ email không hợp lệ!",

    password: "Mật khẩu",
    password_placeholder: "********",
    confirm_password: "Xác nhận mật khẩu",
    password_min: "Mật khẩu phải có ít nhất {min} ký tự!",
    password_max: "Mật khẩu không được vượt quá {max} ký tự!",
    password_mismatch: "Mật khẩu không khớp!",

    full_name: "Họ và tên",
    full_name_placeholder: "John Doe",
    full_name_required: "Họ và tên bắt buộc!",

    otp_code: "Mã OTP",
    otp_length: "Mã OTP phải có {length} ký tự!",
    otp_digits: "OTP phải chứa chỉ số!",

    agree_terms: "Bạn phải đồng ý với điều khoản và chính sách bảo mật!",

    code: "Mã",
    code_placeholder: "Nhập mã...",
    code_required: "Mã bắt buộc!",

    order: "Thứ tự",
    order_placeholder: "Nhập thứ tự...",
    order_required: "Thứ tự bắt buộc!",

    level_name: "Tên cấp độ",
    level_name_placeholder: "Nhập tên cấp độ...",
    level_name_required: "Tên cấp độ bắt buộc!",

    level: "Cấp độ",
    level_placeholder: "Chọn cấp độ",

    target_level: "Cấp độ mục tiêu",
    target_level_placeholder: "Chọn cấp độ mục tiêu",

    topic_name: "Tên chủ đề",
    topic_name_placeholder: "Nhập tên chủ đề...",
    topic_name_required: "Tên chủ đề bắt buộc!",

    status: "Trạng thái",

    image: "Ảnh",
    image_required: "Ảnh bắt buộc!",
    image_invalid: "URL ảnh không hợp lệ",

    slug: "Slug",
    slug_required: "Slug bắt buộc!",
    slug_placeholder: "slug-tu-dong-tao",

    description: "Mô tả",
    description_placeholder: "Nhập mô tả...",

    created_at: "Ngày tạo",

    updated_at: "Ngày cập nhật",

    word: "Từ",
    word_placeholder: "Nhập từ...",
    word_required: "Từ bắt buộc!",

    translation: "Bản dịch",
    translation_placeholder: "Nhập bản dịch...",
    translation_required: "Bản dịch bắt buộc!",

    phonetic: "Phiên âm",
    phonetic_placeholder: "/ˈeksəmpl/",
    phonetic_required: "Phiên âm bắt buộc!",

    topic: "Chủ đề",
    topic_placeholder: "Chọn chủ đề",
    topic_required: "Chủ đề bắt buộc!",

    audio: "Âm thanh",
    audio_placeholder: "https://...",
    audio_invalid: "URL âm thanh không hợp lệ",

    part_of_speech: "Từ loại",
    part_of_speech_placeholder: "Chọn từ loại",
    part_of_speech_required: "Từ loại bắt buộc!",

    synonyms: "Từ đồng nghĩa",
    synonyms_placeholder: "từ1, từ2...",

    antonyms: "Từ trái nghĩa",
    antonyms_placeholder: "từ1, từ2...",

    definition: "Định nghĩa",
    definition_placeholder: "Nhập định nghĩa...",
    definition_required: "Định nghĩa bắt buộc!",
    definition_min: "Cần ít nhất {min} định nghĩa!",

    meaning: "Nghĩa",
    meaning_min: "Cần ít nhất {min} nghĩa!",

    example: "Ví dụ",
    example_placeholder: "Câu ví dụ...",
    example_translation: "Dịch ví dụ",
    example_translation_placeholder: "Dịch ví dụ...",

    phone: "Số điện thoại",
    phone_placeholder: "0123456789",

    role: "Vai trò",
    role_placeholder: "Chọn vai trò",

    daily_goal: "Mục tiêu hàng ngày",
    daily_goal_placeholder: "10",

    streak: "Streak",
    streak_placeholder: "0",

    email_verified: "Xác thực email",

    module_name: "Tên chức năng",
    module_name_required: "Tên chức năng bắt buộc!",

    onboarding_title: "Tiêu đề",
    onboarding_title_placeholder: "Nhập tiêu đề...",
    onboarding_title_required: "Tiêu đề bắt buộc!",
  },
  dashboard: {
    dashboard: "Bảng điều khiển",
    dashboard2: "Bảng điều khiển 2",
  },
  management: {
    management: "Quản lý",
  },
  common: {
    loading: "Đang tải...",

    please_use_desktop_view_to_access_this_feature:
      "Vui lòng sử dụng chế độ xem desktop để truy cập tính năng này.",

    status: {
      active: "Hiển thị",
      inactive: "Tạm ẩn",
      verified: "Đã xác thực",
      unverified: "Chưa xác thực",
    },

    toast: {
      create_success: "Tạo thành công!",
      create_error: "Tạo thất bại, vui lòng thử lại.",
      update_success: "Cập nhật thành công!",
      update_error: "Cập nhật thất bại, vui lòng thử lại.",
      delete_success: "Xóa thành công!",
      delete_error: "Xóa thất bại, vui lòng thử lại.",
      restore_success: "Khôi phục thành công!",
      restore_error: "Khôi phục thất bại, vui lòng thử lại.",
      force_delete_success: "Xóa vĩnh viễn thành công!",
      force_delete_error: "Xóa vĩnh viễn thất bại, vui lòng thử lại.",
    },

    dialog: {
      delete_title: "Bạn có chắc chắn muốn xóa?",
      delete_desc:
        "Hành động này có thể hoàn tác. Sau khi xóa, mọi thứ sẽ được lưu trong thùng rác để bạn khôi phục khi cần.",
      force_delete_title: "Bạn có chắc chắn muốn xóa vĩnh viễn?",
      force_delete_desc:
        "Hành động này không thể hoàn tác. Dữ liệu sẽ bị xóa vĩnh viễn khỏi hệ thống.",
    },

    actions: {
      add: "Thêm",
      edit: "Sửa",
      delete: "Xóa",
      deleting: "Đang xóa...",
      view: "Xem",
      save: "Lưu",
      saving: "Đang lưu...",
      update: "Cập nhật",
      updating: "Đang cập nhật...",
      creating: "Đang tạo...",
      cancel: "Hủy",
      back: "Quay lại",
      restore: "Khôi phục",
      force_delete: "Xóa vĩnh viễn",
      confirm: "Xác nhận",
      close: "Đóng",
      search: "Tìm kiếm",
    },

    trash: {
      trash: "Thùng rác",
      search_placeholder: "Tìm kiếm trong thùng rác...",
    },

    form: {
      required: "*",
    },

    search: {
      placeholder: "Tìm kiếm...",
      input_placeholder: "Bạn cần gì?",
      empty: "Không tìm thấy kết quả.",
      command_search: "Tìm kiếm lệnh",
    },
  },
  grammar: {
    grammar: "Ngữ pháp",
    grammar_management: "Quản lý ngữ pháp",
    grammars: "Ngữ pháp",
  },
  lesson: {
    lesson: "Bài học",
    lesson_management: "Quản lý bài học",
    lessons: "Bài học",
  },
  user: {
    user: "Người dùng",
    user_management: "Quản lý người dùng",
    users: "Người dùng",
    accounts: "Tài khoản",
    search_placeholder: "Tìm kiếm người dùng...",
    user_details: "Chi tiết người dùng",
    user_details_desc: "Xem thông tin chi tiết của người dùng.",
    edit_user: "Sửa người dùng",
    edit_user_desc: "Chỉnh sửa thông tin người dùng.",
    personal_info: "Thông tin cá nhân",
    account_settings: "Cài đặt tài khoản",
    role: {
      admin: "Quản trị viên",
      user: "Người dùng",
    },
    general_info: "Thông tin chung",
    learning_progress: "Tiến độ học tập",
    account_status: "Trạng thái tài khoản",
    avatar: "Ảnh đại diện",
    email_verification_status: "Trạng thái xác thực email",
  },
  setting: {
    setting: "Cài đặt",
    settings: "Cài đặt",
    app_info: "Thông tin ứng dụng",
    app_name: "Tên ứng dụng",
    app_name_placeholder: "Nhập tên ứng dụng...",
    app_description: "Mô tả ứng dụng",
    app_description_placeholder: "Nhập mô tả ứng dụng...",
    primary_color: "Màu chủ đạo",
    logo: "Logo",
    favicon: "Favicon",
    contact_info: "Thông tin liên hệ",
    address: "Địa chỉ",
    address_placeholder: "Nhập địa chỉ...",
    social_media: "Mạng xã hội",
  },
  config: {
    app_config: "Cấu hình ứng dụng",
  },
  billing: {
    billing: "Thanh toán",
    billings: "Thanh toán",
  },
  notification: {
    notification: "Thông báo",
    notifications: "Thông báo",
  },
  data_table: {
    asc: "Tăng dần",
    desc: "Giảm dần",
    hide: "Ẩn",
    view: "Xem",
    edit: "Sửa",
    delete: "Xóa",
    customize: "Tùy chỉnh",
    custom_columns: "Tùy chỉnh cột",
    clear_filter: "Xóa bộ lọc",
    no_results: "Không có kết quả.",
    no_results_found: "Không tìm thấy kết quả.",
    rows_selected: "Đã chọn {selected} trong {total} hàng.",
    rows_per_page: "Số hàng mỗi trang",
    page_of: "Trang {current} / {total}",
    go_first_page: "Đến trang đầu",
    go_previous_page: "Đến trang trước",
    go_next_page: "Đến trang sau",
    go_last_page: "Đến trang cuối",
    open_menu: "Mở menu",
    all: "Tất cả",
    restore: "Khôi phục",
    force_delete: "Xóa vĩnh viễn",
    search_placeholder: "Tìm kiếm...",
  },
  file_upload: {
    drag_drop_here: "Kéo & thả file tại đây",
    or_click_to_select: "Hoặc click để chọn file",
    max_size: "tối đa {size}",
    select_file: "Chọn file",
    file_too_large: "File quá lớn. Kích thước tối đa: {size}KB",
    no_url_from_server: "Không nhận được URL từ server",
    upload_failed: "Upload thất bại",
    file_rejected: '"{fileName}" đã bị từ chối',
  },
  level: {
    level: "Cấp độ",
    level_management: "Quản lý cấp độ",
    levels: "Cấp độ",
    search_placeholder: "Tìm kiếm cấp độ...",
    add_new_level: "Thêm cấp độ mới",
    add_new_level_desc: "Tạo cấp độ mới. Điền thông tin bên dưới.",
    edit_level: "Sửa cấp độ",
    edit_level_desc: "Chỉnh sửa thông tin cấp độ. Điền thông tin bên dưới.",
    level_details: "Chi tiết cấp độ",
    level_details_desc: "Xem thông tin chi tiết của cấp độ.",
  },
  topic: {
    topic: "Chủ đề",
    topic_management: "Quản lý chủ đề",
    topics: "Chủ đề",
    search_placeholder: "Tìm kiếm chủ đề...",
    add_new_topic: "Thêm chủ đề mới",
    add_new_topic_desc: "Tạo chủ đề mới. Điền thông tin bên dưới.",
    edit_topic: "Sửa chủ đề",
    edit_topic_desc: "Chỉnh sửa thông tin chủ đề. Điền thông tin bên dưới.",
    topic_details: "Chi tiết chủ đề",
    topic_details_desc: "Xem thông tin chi tiết của chủ đề.",
  },
  vocabulary: {
    vocabulary: "Từ vựng",
    vocabulary_management: "Quản lý từ vựng",
    vocabularies: "Từ vựng",
    search_placeholder: "Tìm kiếm từ vựng...",
    add_new_vocabulary: "Thêm từ vựng mới",
    add_new_vocabulary_desc: "Nhập từ để tự động lấy thông tin.",
    create_manually: "Tạo thủ công",
    search_and_auto_fill: "Tìm kiếm & Tự động điền",
    sections: {
      basic_info: "Thông tin cơ bản",
      audio: "Âm thanh",
      image: "Hình ảnh",
      meanings: "Nghĩa & Định nghĩa",
    },
    edit_vocabulary: "Sửa từ vựng",
    vocabulary_details: "Chi tiết từ vựng",

    enter_vocabulary_eg: "Nhập từ vựng (ví dụ: apple)...",
    vocabulary_found_redirect: "Tìm thấy từ vựng! Đang chuyển hướng...",
    vocabulary_not_found: "Không tìm thấy từ vựng",
    no_data_for_this_vocabulary: "Không có dữ liệu cho từ vựng này",

    audio: {
      audio_us: "Âm thanh Mỹ",
      audio_uk: "Âm thanh Anh",
      audio_au: "Âm thanh Úc",
    },

    meaning: {
      add: "Thêm nghĩa",
      info: "Thông tin ngữ nghĩa",
    },

    definition: {
      add: "Thêm định nghĩa",
      list: "Danh sách định nghĩa",
    },
  },
  module: {
    module: "Chức năng",
    modules: "Chức năng",
    search_placeholder: "Tìm kiếm chức năng",
    add_new_module: "Thêm chức năng mới",
    add_new_module_desc: "Tạo chức năng mới. Điền thông tin bên dưới",
    edit_module: "Sửa chức năng",
    edit_module_desc: "Chỉnh sửa thông tin chức năng. Điền thông tin bên dưới.",
    module_details: "Chi tiết chức năng",
    module_details_desc: "Xem thông tin chi tiết của chức năng.",
  },
  onboarding: {
    onboarding: "Onboarding",
    onboardings: "Onboarding",
    search_placeholder: "Tìm kiếm onboarding...",
    add_new_onboarding: "Thêm onboarding mới",
    add_new_onboarding_desc: "Tạo onboarding mới. Điền thông tin bên dưới.",
    edit_onboarding: "Sửa onboarding",
    edit_onboarding_desc:
      "Chỉnh sửa thông tin onboarding. Điền thông tin bên dưới.",
    onboarding_details: "Chi tiết onboarding",
    onboarding_details_desc: "Xem thông tin chi tiết của onboarding.",
  },
  social: {
    apple: "Apple",
    google: "Google",
    meta: "Meta",
  },
} as const;

export type MessageKeys = typeof defaultMessages;
