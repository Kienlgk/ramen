package com.example.baovy.ex3;

import android.os.Parcel;
import android.os.Parcelable;

import java.util.ArrayList;

public class Exam implements Parcelable {
    private String hk_nh;
    private ArrayList<ExamDetail> lichthi;
    private String ngay_cap_nhat;
    private String ten_hocky;
    private String trang_thai;

    protected Exam(Parcel in) {
        hk_nh = in.readString();
        ngay_cap_nhat = in.readString();
        ten_hocky = in.readString();
        trang_thai = in.readString();
    }

    public static final Creator<Exam> CREATOR = new Creator<Exam>() {
        @Override
        public Exam createFromParcel(Parcel in) {
            return new Exam(in);
        }

        @Override
        public Exam[] newArray(int size) {
            return new Exam[size];
        }
    };

    public String getHk_nh() {
        return hk_nh;
    }

    public void setHk_nh(String hk_nh) {
        this.hk_nh = hk_nh;
    }

    public ArrayList<ExamDetail> getLichthi() {
        return lichthi;
    }

    public void setLichthi(ArrayList<ExamDetail> lichthi) {
        this.lichthi = lichthi;
    }

    public String getNgay_cap_nhat() {
        return ngay_cap_nhat;
    }

    public void setNgay_cap_nhat(String ngay_cap_nhat) {
        this.ngay_cap_nhat = ngay_cap_nhat;
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
        dest.writeString(hk_nh);
        dest.writeString(ngay_cap_nhat);
        dest.writeString(ten_hocky);
        dest.writeString(trang_thai);
    }
}
