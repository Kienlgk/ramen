package com.example.baovy.ex3.adapters;

import android.content.Context;
import android.util.TypedValue;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.example.baovy.ex3.Grade;
import com.example.baovy.ex3.GradeDetail;
import com.example.baovy.ex3.R;

public class GradeListAdapter extends BaseAdapter {
    private Context context;
    private LayoutInflater inflater;
    private Grade gradeArrayList;

    static class AdapterHolder {
        TextView subject;
        TextView group;
        TextView numCredit;
        TextView scores;
        TextView testScore;
        TextView finalScore;

        TextView creditSemester;
        TextView totalCreditSemester;
        TextView gpa;
        TextView totalCredit;
        TextView gpaFinal;
    }

    public GradeListAdapter(Context context, Grade gradeArrayList) {
        this.context = context;
        this.gradeArrayList = gradeArrayList;
        this.inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
    }

    @Override
    public int getCount() {
        return gradeArrayList.getDiem().size() + 1;
    }

    @Override
    public Object getItem(int position) {
        return gradeArrayList.getDiem().get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        AdapterHolder holder;

        int type = getItemViewType(position);

        if (convertView == null) {
            holder = new AdapterHolder();

            switch (type) {
                case 0:
                    convertView = inflater.inflate(R.layout.grade_info, null);
                    holder.creditSemester = (TextView) convertView.findViewById(R.id.creditSemester);
                    holder.totalCreditSemester = (TextView) convertView.findViewById(R.id.totalCreditSemester);
                    holder.gpa = (TextView) convertView.findViewById(R.id.gpa);
                    holder.totalCredit = (TextView) convertView.findViewById(R.id.totalCredit);
                    holder.gpaFinal = (TextView) convertView.findViewById(R.id.gpaFinal);
                    break;
                case 1:
                    convertView = inflater.inflate(R.layout.grade_item, null);
                    holder.subject = (TextView) convertView.findViewById(R.id.subject);
                    holder.group = (TextView) convertView.findViewById(R.id.group);
                    holder.numCredit = (TextView) convertView.findViewById(R.id.numCredit);
                    holder.scores = (TextView) convertView.findViewById(R.id.scores);
                    holder.testScore = (TextView) convertView.findViewById(R.id.testScore);
                    holder.finalScore = (TextView) convertView.findViewById(R.id.finalScore);
                    break;
                default:
                    break;
            }
            convertView.setTag(holder);
        } else {
            holder = (AdapterHolder) convertView.getTag();
        }
        switch (type) {
            case 0:
                holder.creditSemester.setText(gradeArrayList.getSo_tc());
                holder.totalCreditSemester.setText(gradeArrayList.getSo_tctl_hk());
                holder.gpa.setText(gradeArrayList.getDiem_tb());
                holder.totalCredit.setText(gradeArrayList.getSo_tctl());
                holder.gpaFinal.setText(gradeArrayList.getDiem_tbtl());
                break;
            case 1:
                GradeDetail gradeDetail = gradeArrayList.getDiem().get(position-1);

                holder.subject.setText(gradeDetail.getMa_mh() + " - " + gradeDetail.getTen_mh());
                holder.subject.setTextSize(TypedValue.COMPLEX_UNIT_SP, 16);

                holder.group.setText("Nhóm - Tổ: " + (gradeDetail.getNhomto() != null ? gradeDetail.getNhomto() : ""));
                holder.numCredit.setText("Số TC: " + (gradeDetail.getSo_tin_chi() != null ? gradeDetail.getSo_tin_chi() : ""));
                holder.scores.setText("Điểm thành phần: " + (gradeDetail.getDiem_thanhphan() != null ? gradeDetail.getDiem_thanhphan() : ""));
                holder.testScore.setText("Điểm thi: " + (gradeDetail.getDiem_thi() != null ? gradeDetail.getDiem_thi() : ""));
                holder.finalScore.setText("Điểm tổng kết: " + (gradeDetail.getDiem_tong_ket() != null ? gradeDetail.getDiem_tong_ket() : ""));
                break;
            default:
                break;
        }
        return convertView;
    }

    @Override
    public int getItemViewType(int position) {
        if (position == 0) {
            return 0;
        } else {
            return 1;
        }
    }

    @Override
    public int getViewTypeCount() {
        return 2;
    }
}
