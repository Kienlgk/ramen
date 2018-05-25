package com.example.baovy.ex3.adapters;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.baovy.ex3.Schedule;
import com.example.baovy.ex3.R;

public class ScheduleListAdapter extends RecyclerView.Adapter<ScheduleListAdapter.ViewHolder> {
    private Schedule mSchedule;

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView mTenMhTextView;
        public TextView mNhomToTextView;
        public TextView mSoTinChiTextView;
        public TextView mTchpTextView;
        public TextView mMucHpTextView;
        public TextView mThuTextView;
        public TextView mTietTextView;
        public TextView mPhongTextView;
        public TextView mTuanHocTextView;

        public ViewHolder(View v) {
            super(v);

            mTenMhTextView = (TextView) v.findViewById(R.id.fragment_schedule_viewholder_ten_mh_text_view);
            mNhomToTextView = (TextView) v.findViewById(R.id.fragment_schedule_viewholder_nhomto_text_view);
            mSoTinChiTextView = (TextView) v.findViewById(R.id.fragment_schedule_viewholder_so_tin_chi_text_view);
            mTchpTextView = (TextView) v.findViewById(R.id.fragment_schedule_viewholder_tchp_text_view);
            mMucHpTextView = (TextView) v.findViewById(R.id.fragment_schedule_viewholder_muc_hp_text_view);
            mThuTextView = (TextView) v.findViewById(R.id.fragment_schedule_viewholder_thu_text_view);
            mTietTextView = (TextView) v.findViewById(R.id.fragment_schedule_viewholder_tiet_text_view);
            mPhongTextView = (TextView) v.findViewById(R.id.fragment_schedule_viewholder_phong_text_view);
            mTuanHocTextView = (TextView) v.findViewById(R.id.fragment_schedule_viewholder_tuan_hoc_text_view);
        }
    }

    public ScheduleListAdapter(Schedule schedule) {
        this.mSchedule = schedule;
    }

    public void changeSchedule(Schedule schedule) {
        this.mSchedule = schedule;
        notifyDataSetChanged();
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.fragment_schedule_viewholder, parent, false);

        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        String maMh = mSchedule.getLichhoc().get(position).getMa_mh();
        holder.mTenMhTextView.setText(maMh + " - " + mSchedule.getLichhoc().get(position).getTen_mh());
        holder.mNhomToTextView.setText(mSchedule.getLichhoc().get(position).getNhomto());

        String soTinChi = mSchedule.getLichhoc().get(position).getSo_tin_chi();
        holder.mSoTinChiTextView.setText(soTinChi.equals("0") ? "--" : soTinChi);

        String soTchp = mSchedule.getLichhoc().get(position).getTc_hp();
        holder.mTchpTextView.setText(soTchp == null || soTchp.equals("0") ? "--" : soTchp);

        String mucHocPhi = mSchedule.getLichhoc().get(position).getMuc_hocphi();
        holder.mMucHpTextView.setText(mucHocPhi == null ? "--" : mucHocPhi);

        String tietBatDau = mSchedule.getLichhoc().get(position).getTiet_bd1();
        if (tietBatDau.equals("0")) {
            holder.mTietTextView.setText("--");
        } else {
            String tietKetThuc = mSchedule.getLichhoc().get(position).getTiet_kt1();
            holder.mTietTextView.setText(tietBatDau + "-" + tietKetThuc);
        }

        holder.mPhongTextView.setText(mSchedule.getLichhoc().get(position).getPhong1());
        holder.mTuanHocTextView.setText(mSchedule.getLichhoc().get(position).getTuan_hoc());
    }

    @Override
    public int getItemCount() {
        return mSchedule.getLichhoc().size();
    }
}
