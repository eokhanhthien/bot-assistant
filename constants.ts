import { KnowledgeItem } from './types';

// ==========================================
// CONFIGURATION AREA
// ==========================================

export const APP_CONFIG = {
  botName: "Trợ lý giải đáp thắc mắc - VietinBank CN Cà Mau",
  welcomeMessage: "Trợ lý hỗ trợ giải đáp thắc mắc của VietinBank xin kính chào Quý khách.\nEm có thể hỗ trợ gì cho Quý khách ạ?",
  safetyWarning: "", // Included in flow manually if needed
  feedbackQuestion: "Quý khách đã thực hiện thành công chưa ạ? Quý khách có cần em hỗ trợ thêm gì không?",
  feedbackSuccess: "Tuyệt vời! Em rất vui khi đã hỗ trợ được Quý khách thành công. 😊",
  feedbackFailure: "Em xin lỗi vì chưa hỗ trợ được Quý khách tốt. Quý khách có thể liên hệ Chuyên viên tư vấn để được hỗ trợ trực tiếp nhé.",
  goodbyeMessage: "Cảm ơn Quý khách đã sử dụng dịch vụ của VietinBank. Chúc Quý khách một ngày tốt lành! 🌟",
  contactInfo: `Để được hỗ trợ trực tiếp và nhanh chóng hơn, Quý khách vui lòng liên hệ với Chuyên viên Dịch vụ Khách hàng của chúng tôi:

**Tên:** Trần Văn XXXXX
**Số điện thoại:** 09XXXXXXXX
**Đơn vị:** Phòng Dịch vụ Khách hàng, VietinBank Chi nhánh Cà Mau

⚠️ *Lưu ý: Quý khách vui lòng không chia sẻ mật khẩu hay mã OTP cho bất kỳ ai, kể cả nhân viên ngân hàng.*`
};

// ==========================================
// KNOWLEDGE BASE
// ==========================================

export const KNOWLEDGE_BASE: Record<string, KnowledgeItem> = {
  "kichHoatThe": {
    id: "kichHoatThe",
    title: "1. Kích hoạt và đổi mã pin thẻ",
    content: "Dạ, để kích hoạt thẻ VietinBank, Quý khách có thể thực hiện rất đơn giản theo hướng dẫn sau:",
    steps: [
      { step: "B1", content: "Đăng nhập vào Vietinbank Ipay sau đó chọn **DANH SÁCH THẺ**" },
      { step: "B2", content: "Chọn đúng Thẻ Tín dụng hoặc Thẻ Ghi nợ cần kích hoạt sau đó Bấm **KÍCH HOẠT THẺ**" },
      { step: "B3", content: "Nhập đúng 8 số cuối trên thẻ cần kích hoạt sau đó Bấm **XÁC NHẬN**" },
      { step: "B4", content: "Nhập Soft OTP sau đó Bấm **XÁC NHẬN & HOÀN TẤT**" },
      { step: "B5", content: "Thực hiện đổi pin cho thẻ đã kích hoạt bằng cách Bấm **ĐỔI PIN NGAY**" },
      { step: "B6", content: "Nhập 2 lần số PIN sau đó Bấm **TIẾP TỤC**" },
      { step: "B7", content: "Nhập Soft OTP sau đó Bấm **XÁC NHẬN & HOÀN TẤT**" },
      { step: "B8", content: "Bấm **ĐỒNG Ý** để hoàn thành kích hoạt thẻ và đổi mã PIN" }
    ],
    videoLink: "https://youtube.com/shorts/4A7eB9eIT-Y"
  },
  "quenMatKhau": {
    id: "quenMatKhau",
    title: "2. Quên mật khẩu Ipay",
    content: "Để đổi mật khẩu VietinBank iPay khi quên, Quý khách vui lòng làm theo hướng dẫn sau:",
    steps: [
      { step: "B1", content: "Ở màn hình đăng nhập chọn **QUÊN MẬT KHẨU**" },
      { step: "B2", content: "Nhập Tên đăng nhập và số điện thoại đăng ký sau đó Bấm **TIẾP TỤC**\n(Lưu ý: Một số trường hợp tên đăng nhập có thể không phải là số điện thoại)" },
      { step: "B3", content: "Nhập mã OTP được gửi về tin nhắn (SMS) sau đó Bấm **TIẾP TỤC**" },
      { step: "B4", content: "Thực hiện xác thực khuôn mặt theo yêu cầu. Sau khi hoàn thành Ipay sẽ gửi mật khẩu mới về tin nhắn (SMS). Bấm **ĐĂNG NHẬP IPAY** để tiếp tục" },
      { step: "B5", content: "Nhập các mật khẩu theo yêu cầu:\n- **Mật khẩu hiện tại:** Nhập theo mật khẩu được gửi về tin nhắn (SMS)\n- **Mật khẩu mới:** Là mật khẩu mà khách hàng cần đổi\nSau đó Bấm **TIẾP TỤC**\n(Vui lòng xem kỹ lưu ý về cách đặt mật khẩu)" },
      { step: "B6", content: "Thực hiện quét khuôn mặt để xác nhận đổi mật khẩu thành công" }
    ],
    videoLink: "https://www.youtube.com/watch?v=86r0pxPOzbs"
  },
  "dongThe": {
    id: "dongThe",
    title: "3. Đóng thẻ",
    content: "Để đóng thẻ VietinBank, Quý khách vui lòng thực hiện theo hướng dẫn chi tiết trong slide bên dưới:",
    slidesId: "1QRQlt8SnnKzzfkD-fDgQCN5ww7GQY3PFBOmNyDoSIW0",
    totalSlides: 6
  },
  "sinhTracHoc": {
    id: "sinhTracHoc",
    title: "4. Đăng ký sinh trắc học",
    content: "Để đăng ký sinh trắc học cho tài khoản VietinBank iPay, Quý khách vui lòng thực hiện theo hướng dẫn chi tiết trong slide và video bên dưới:",
    slidesId: "1Q2srsbCOf0zIoqi3L9paGcrvBYwQN0gEm3O7bdNxFJ4",
    totalSlides: 4,
    videoLink: "https://www.youtube.com/watch?v=9yYn3SbMT9A"
  },
  "doiThe": {
    id: "doiThe",
    title: "5. Đổi thẻ trên Ipay",
    content: "Để đổi thẻ VietinBank trên ứng dụng iPay, Quý khách vui lòng xem video hướng dẫn chi tiết:",
    videoLink: "https://www.youtube.com/watch?v=IrFq6LNbl_I"
  },
  "giaodichAnToan": {
    id: "giaodichAnToan",
    title: "6. Hướng dẫn giao dịch an toàn",
    content: `Để đảm bảo an toàn trong giao dịch ngân hàng, Quý khách cần lưu ý:

**1. Bảo mật thông tin cá nhân:**
- Tuyệt đối không chia sẻ mật khẩu, mã PIN, mã OTP cho bất kỳ ai, kể cả nhân viên ngân hàng
- Không để lộ thông tin thẻ, số tài khoản trên mạng xã hội

**2. Cảnh giác với các thủ đoạn lừa đảo:**
- Không truy cập vào các đường link lạ được gửi qua email, SMS, Zalo
- Không cung cấp thông tin khi có cuộc gọi tự xưng là nhân viên ngân hàng yêu cầu
- Kiểm tra kỹ địa chỉ website trước khi đăng nhập

**3. Sử dụng ứng dụng chính thức:**
- Chỉ tải ứng dụng VietinBank iPay từ kênh chính thức: App Store, Google Play
- Cập nhật ứng dụng thường xuyên để có các tính năng bảo mật mới nhất

**4. Liên hệ ngay khi phát hiện bất thường:**
- Gọi hotline 1900 558 868 hoặc liên hệ chi nhánh gần nhất`
  },
  "chiDuong": {
      id: "chiDuong",
      title: "7. Chỉ đường đến PGD & ATM",
      content: "Quý khách có thể xem bản đồ và chỉ đường tới PGD & ATM dưới đây:",
      videoLink: "https://eokhanhthien.github.io/atm-location/" // Using map link logic but as a 'link' type
  },
  "chuyenVien": {
      id: "chuyenVien",
      title: "8. Gặp chuyên viên tư vấn",
      content: APP_CONFIG.contactInfo
  }
};

export const MENU_OPTIONS = Object.values(KNOWLEDGE_BASE).map(item => ({
  id: item.id,
  label: item.title
}));