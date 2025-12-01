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
    videoLink: "https://www.youtube.com/watch?v=acdT3KxET40"
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
  "Alilas": {
      id: "Alilas",
      title: "7. Cài đặt Alilas",
      content: "Quý khách có thể xem hướng dẫn cài đặt **ALILAS** dưới đây:",
      videoLink: "https://www.youtube.com/watch?v=idpNaKkYvMs" 
  },
  "chiDuong": {
      id: "chiDuong",
      title: "8. Chỉ đường đến PGD & ATM",
      content: "Quý khách có thể xem bản đồ và chỉ đường tới PGD & ATM dưới đây:",
      mapLink: "https://eokhanhthien.github.io/atm-location/"
  },
  "nangHanMucTheTinDung": {
    id: "nangHanMucTheTinDung",
    title: "9. Nâng hạn mức thẻ tín dụng",
    content: "Quý khách có thể xem video hướng dẫn nâng hạn mức thẻ tín dụng dưới đây:",
    videoLink: "https://www.youtube.com/watch?v=Jrmz_Z9Uqqs"
  },
  "installIpay": {
    id: "installIpay",
    title: "10. Hướng dẫn cài đặt và đăng nhập ứng dụng VietinBank iPay Mobile",
    content: "Quý khách có thể xem video hướng dẫn cài đặt và đăng nhập ứng dụng VietinBank iPay dưới đây:",
    videoLink: "https://www.youtube.com/watch?v=bzKxHlFYelE"
  },
  "capLaiTenDangNhapIpay": {
    id: "capLaiTenDangNhapIpay",
    title: "11. Hướng dẫn cấp lại tên đăng nhập tên đăng nhập VietinBank iPay Mobile",
    content: "Quý khách có thể xem video hướng dẫn cấp lại tên đăng nhập tên đăng nhập VietinBank iPay Mobile dưới đây:",
    videoLink: "https://www.youtube.com/watch?v=AUU8Kqeq1NY"
  },
  "kichHoatIpayLanDau": {
    id: "kichHoatIpayLanDau",
    title: "12. Hướng dẫn kích hoạt, sử dụng ứng dụng VietinBank iPay lần đầu",
    content: "Quý khách có thể xem video hướng dẫn kích hoạt, sử dụng ứng dụng VietinBank iPay lần đầu:",
    steps: [
      { step: "B1", content: "Đăng nhập VietinBank iPay (Tên đăng nhập và mật khẩu được gửi về số điện thoại khách hàng khi đăng ký dịch vụ)" },
      { step: "B2", content: "Chụp 2 mặt giấy tờ tùy thân theo hướng dẫn \n Chụp ảnh chân dung \n Thực hiện NFC đọc thông tin chip Căn cước công dân \n Xác nhận thông tin" },
      { step: "B3", content: "Thực hiện đổi mật khẩu: Nhập lại mật khẩu hiện tại, mật khẩu mới theo hướng dẫn" },
      { step: "B4", content: "Xác nhận mã OTP: Nhập mã OTP để xác nhận yêu cầu cấp lại mật khẩu" },
      { step: "B5", content: "Khách hàng đăng nhập bằng mật khẩu mới vừa thực hiện đổi thành công" },
    ],
    videoLink: "https://www.youtube.com/watch?v=DCxpAr0HiX0"
  },
  "ottVoice": {
    id: "ottVoice",
    title: "13. Hướng dẫn cài đặt thông báo số dư qua giọng nói OTT Voice",
    content: "Quý khách có thể xem video hướng dẫn cài đặt thông báo số dư qua giọng nói dưới đây:",
    videoLink: "https://www.youtube.com/watch?v=y6wUrQnp3AU"
  },
  "thanhToanHoaDon": {
    id: "thanhToanHoaDon",
    title: "14. Hướng dẫn thanh toán hóa đơn trên VietinBank iPay",
    content: "Quý khách có thể xem video hướng dẫn thanh toán hóa đơn trên VietinBank iPay dưới đây:",
    steps: [
      { step: "B1", content: "Qúy khách đăng nhập ứng dụng Ngân hàng số VietinBank iPay Mobile, chọn **Thanh toán hóa đơn**" },
      { step: "B2", content: "Chọn dịch vụ cần thanh toán (Điện/Nước/Internet...)" },
      { step: "B3", content: "Nhập thông tin theo yêu cầu tại màn hình và ấn truy vấn hóa đơn" },
      { step: "B4", content: "Xác thực thông tin, nhập mã xác thực và hoàn tất giao dịch" },
    ],
    videoLink: "https://www.youtube.com/watch?v=qXxkWPLXpBc"
  },
  "moTaiKhoan": {
    id: "moTaiKhoan",
    title: "15. Hướng dẫn mở tài khoản thanh toán bằng CCCD trên VietinBank iPay",
    content: "Quý khách có thể xem video hướng dẫn mở tài khoản thanh toán bằng CCCD trên VietinBank iPay dưới đây:",
    steps: [
      { step: "B1", content: "Tải ứng dụng Ngân hàng số VietinBank iPay Mobile" },
      { step: "B2", content: "Mở ứng dụng VietinBank iPay chọn **Chưa có tên đăng nhập/mật khẩu** \n Chọn **Quý khách chưa có thông tin tại VietinBank**" },
      { step: "B3", content: "Nhập số điện thoại đang sử dụng và Nhập mã OTP gửi vào điện thoại" },
      { step: "B4", content: "Chọn **Mở tài khoản mới và thẻ khác**" },
      { step: "B5", content: "Nhập số CCCD gắn chip và chọn **Bắt đầu chụp**" },
      { step: "B6", content: "Chụp mặt trước, mặt sau của CCCD và Chụp khuôn mặt" },
      { step: "B7", content: "Chọn **Đã hiểu và bắt đầu đọc thông tin**" },
      { step: "B8", content: "Thực hiện NFC" },
      { step: "B9", content: "Chọn **Tiếp tục mở tài khoản & cập nhật hồ sơ** và thực hiện theo hướng dẫn" },
      { step: "B10", content: "Nhận thông báo user/mật khẩu đăng nhập lần đầu qua SMS. Thực hiện đăng nhập iPay và đổi mật khẩu lần đầu để sử dụng." },
    ],
    videoLink: "https://www.youtube.com/watch?v=4ODhAqhT9Cw"
  },
  "chuyenVien": {
      id: "chuyenVien",
      title: "Gặp chuyên viên tư vấn",
      content: APP_CONFIG.contactInfo
  }
};

export const MENU_OPTIONS = Object.values(KNOWLEDGE_BASE).map(item => ({
  id: item.id,
  label: item.title
}));