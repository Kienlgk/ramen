package com.example.baovy.ex3;

import android.os.Parcel;
import android.os.Parcelable;

import java.util.ArrayList;

public class Grade implements Parcelable {
    private ArrayList<GradeDetail> diem;
    private String diem_renluyen;
    private String diem_tb;
    private String diem_tbtl;
    private String dtb_1hocky;
    private String dtb_chung_morong;
    private String hk_nh;
    private String ngay_cap_nhat;
    private String ngay_th;
    private String so_tc;
    private String so_tctl;
    private String so_tctl_hk;
    private String sotc_dat_hocky;
    private String ten_hocky;
    private String trang_thai;

    protected Grade(Parcel in) {
        diem_renluyen = in.readString();
        diem_tb = in.readString();
        diem_tbtl = in.readString();
        dtb_1hocky = in.readString();
        dtb_chung_morong = in.readString();
        hk_nh = in.readString();
        ngay_cap_nhat = in.readString();
        ngay_th = in.readString();
        so_tc = in.readString();
        so_tctl = in.readString();
        so_tctl_hk = in.readString();
        sotc_dat_hocky = in.readString();
        ten_hocky = in.readString();
        trang_thai = in.readString();
    }

    public static final Creator<Grade> CREATOR = new Creator<Grade>() {
        @Override
        public Grade createFromParcel(Parcel in) {
            return new Grade(in);
        }

        @Override
        public Grade[] newArray(int size) {
            return new Grade[size];
        }
    };

    public ArrayList<GradeDetail> getDiem() {
        return diem;
    }

    public void setDiem(ArrayList<GradeDetail> diem) {
        this.diem = diem;
    }

    public String getDiem_renluyen() {
        return diem_renluyen;
    }

    public void setDiem_renluyen(String diem_renluyen) {
        this.diem_renluyen = diem_renluyen;
    }

    public String getDiem_tb() {
        return diem_tb;
    }

    public void setDiem_tb(String diem_tb) {
        this.diem_tb = diem_tb;
    }

    public String getDiem_tbtl() {
        return diem_tbtl;
    }

    public void setDiem_tbtl(String diem_tbtl) {
        this.diem_tbtl = diem_tbtl;
    }

    public String getDtb_1hocky() {
        return dtb_1hocky;
    }

    public void setDtb_1hocky(String dtb_1hocky) {
        this.dtb_1hocky = dtb_1hocky;
    }

    public String getDtb_chung_morong() {
        return dtb_chung_morong;
    }

    public void setDtb_chung_morong(String dtb_chung_morong) {
        this.dtb_chung_morong = dtb_chung_morong;
    }

    public String getHk_nh() {
        return hk_nh;
    }

    public void setHk_nh(String hk_nh) {
        this.hk_nh = hk_nh;
    }

    public String getNgay_cap_nhat() {
        return ngay_cap_nhat;
    }

    public void setNgay_cap_nhat(String ngay_cap_nhat) {
        this.ngay_cap_nhat = ngay_cap_nhat;
    }

    public String getNgay_th() {
        return ngay_th;
    }

    public void setNgay_th(String ngay_th) {
        this.ngay_th = ngay_th;
    }

    public String getSo_tc() {
        return so_tc;
    }

    public void setSo_tc(String so_tc) {
        this.so_tc = so_tc;
    }

    public String getSo_tctl() {
        return so_tctl;
    }

    public void setSo_tctl(String so_tctl) {
        this.so_tctl = so_tctl;
    }

    public String getSo_tctl_hk() {
        return so_tctl_hk;
    }

    public void setSo_tctl_hk(String so_tctl_hk) {
        this.so_tctl_hk = so_tctl_hk;
    }

    public String getSotc_dat_hocky() {
        return sotc_dat_hocky;
    }

    public void setSotc_dat_hocky(String sotc_dat_hocky) {
        this.sotc_dat_hocky = sotc_dat_hocky;
    }

    public String getTen_hocky() {
        return ten_hocky;
    }

    public void setTen_hocky(String ten_hocky) {
        this.ten_hocky = ten_hocky;
    }

    public String getTrang_thai() {
        return trang_thai;
    }

    public void setTrang_thai(String trang_thai) {
        this.trang_thai = trang_thai;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(diem_renluyen);
        dest.writeString(diem_tb);
        dest.writeString(diem_tbtl);
        dest.writeString(dtb_1hocky);
        dest.writeString(dtb_chung_morong);
        dest.writeString(hk_nh);
        dest.writeString(ngay_cap_nhat);
        dest.writeString(ngay_th);
        dest.writeString(so_tc);
        dest.writeString(so_tctl);
        dest.writeString(so_tctl_hk);
        dest.writeString(sotc_dat_hocky);
        dest.writeString(ten_hocky);
        dest.writeString(trang_thai);
    }
}
